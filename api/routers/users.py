from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator, UserAuthenticator
from typing import List, Union
from pydantic import BaseModel

from queries.users import (
    UserIn,
    UserOut,
    UpdateSelf,
    UserQueries,
    Error,
    DuplicateUserError,
)


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


def get_current_user(
    user: UserOut = Depends(authenticator.get_current_account_data),
):
    return user


def is_admin(user: UserOut = Depends(authenticator.get_current_account_data)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not Authorized")
    return user


def get_authenticator():
    return UserAuthenticator(get_current_user)


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
):
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user,
        }


@router.post("/api/users/", response_model=UserToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    current_user: UserOut = Depends(
        authenticator.try_get_current_account_data
    ),
    query: UserQueries = Depends(),
):
    if info.role == "admin":
        if not current_user or current_user["role"] != "admin":
            raise HTTPException(
                status_code=403, detail="Only Admin Creates Admin"
            )
    hashed_password = authenticator.hash_password(info.password)
    try:
        user = query.create_user(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create a user with those credentials",
        )
    form = UserForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, query)
    return UserToken(user=user, **token.dict())


@router.get("/api/users/", response_model=Union[List[UserOut], Error])
def get_all_users(
    current_user: UserOut = Depends(is_admin),
    query: UserQueries = Depends(),
):
    if current_user:
        return query.get_all_users()
    else:
        return "You need to be an ADMIN to view this"


@router.delete("/api/users/{username}/", response_model=bool)
def delete_user(
    username: str,
    current_user: UserOut = Depends(is_admin),
    query: UserQueries = Depends(),
):
    if current_user:
        return query.delete_user(username)
    else:
        return "You need to be an ADMIN to view this"


@router.put(
    "/api/users/{username}/self/", response_model=Union[UserOut, Error]
)
def update_user(
    username: str,
    user: UpdateSelf,
    current_user: UserOut = Depends(get_current_user),
    query: UserQueries = Depends(),
):
    if current_user:
        if current_user["username"] != username:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only update your own account",
            )

        try:
            hashed_password = authenticator.hash_password(user.password)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error hashing password: {e}",
            )

        try:
            updated = query.update_user_self(username, user, hashed_password)
        except DuplicateUserError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot update user with those credentials",
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error updating user: {e}",
            )
        return updated
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You need to log in to view this",
        )


@router.put("/api/users/{username}/", response_model=Union[UserOut, Error])
def update_admin(
    username: str,
    user: UserIn,
    current_user: UserOut = Depends(is_admin),
    query: UserQueries = Depends(),
):
    if current_user:
        if (
            current_user["role"] != "admin"
            and user.role != current_user["role"]
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to change user roles",
            )
        hashed_password = authenticator.hash_password(user.password)
        try:
            updated = query.update_user_admin(username, user, hashed_password)
        except DuplicateUserError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot update user with those credentials",
            )
        return updated
    else:
        return "You need to log in to view this"


@router.get("/api/users/{username}/", response_model=Union[UserOut, Error])
def get_user_by_username(
    username: str,
    response: Response,
    current_user: UserOut = Depends(get_current_user),
    query: UserQueries = Depends(),
):
    if current_user:
        user = query.get_user_by_username(username)
        if user is None:
            raise HTTPException(status_code=404, detail="Invalid user")
        return user


@router.get("/api/userdata/", response_model=UserOut | None)
async def get_account_data(
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> UserOut | None:
    if user:
        return UserOut(**user)
