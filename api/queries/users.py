from pydantic import BaseModel

from queries.pool import pool
from typing import Optional, List, Union


class Error(BaseModel):
    message: str


class DuplicateUserError(ValueError):
    pass


class UserIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: str
    password: str
    role: str



class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str
    role: str



class UserOutWithPassword(UserOut):
    hashed_password: str


class UserListOut(BaseModel):
    users: List[UserOut]


class UserQueries:
    def create_user(self, user: UserIn, hashed_password: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name, last_name, username, email, hashed_password, role)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING
                        id, first_name, last_name, username, email, hashed_password, role;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            user.email,
                            hashed_password,
                            user.role
                        ]
                    )
                    id = result.fetchone()[0]
                    return UserOutWithPassword(
                        id=id,
                        first_name=user.first_name,
                        last_name=user.last_name,
                        username=user.username,
                        email=user.email,
                        hashed_password=hashed_password,
                        role=user.role
                    )
        except Exception:
            return {"message": "Could not create a user"}


    def get_all_users(self) -> Union[Error, UserListOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM users
                        ORDER BY id
                        """,
                    )
                    return [
                        UserListOut(
                            id=user[0],
                            first_name=user[1],
                            last_name=user[2],
                            username=user[3],
                            role=user[4],
                            )
                        for user in db
                    ]
        except Exception:
            return {"message":"No Users"}


    def get(self, user_id: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                        user_id,
                        first_name,
                        last_name,
                        username,
                        role,
                        hashed_password
                        FROM users
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    record = result.fetchone()
                    print("record found",record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}

    def delete_user(self, user_id: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        RETURNING *;
                        """,
                        (user_id),
                    )
                return True
        except Exception:
            return {"message": "User did not delete"}


    def get_user_by_username(self, username: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT *
                    FROM users
                    WHERE username = %s
                    """,
                    [username],
                )
                record = None
                row = db.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(db.description):
                        record[column.name] = row[i]
                else:
                    return None

                return UserOutWithPassword(**record)
