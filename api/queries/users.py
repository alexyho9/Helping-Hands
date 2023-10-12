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
    def create_user(
        self, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name,
                            last_name,
                            username,
                            email,
                            hashed_password,
                            role
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING
                        id,
                        first_name,
                        last_name,
                        username,
                        email,
                        hashed_password,
                        role;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            user.email,
                            hashed_password,
                            user.role,
                        ],
                    )
                    id = result.fetchone()[0]
                    return UserOutWithPassword(
                        id=id,
                        first_name=user.first_name,
                        last_name=user.last_name,
                        username=user.username,
                        email=user.email,
                        hashed_password=hashed_password,
                        role=user.role,
                    )
        except Exception:
            return {"message": "Could not create a user"}

    def update_user(
        self, username: str, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET first_name = %s,
                            last_name = %s,
                            username = %s,
                            email = %s,
                            hashed_password = %s,
                            role = %s
                        WHERE username = %s
                        RETURNING *
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.username,
                            user.email,
                            hashed_password,
                            user.role,
                            username,
                        ],
                    )
                    update = db.fetchone()
                    return UserOutWithPassword(
                        id=update[0],
                        first_name=update[1],
                        last_name=update[2],
                        username=update[3],
                        email=update[4],
                        hashed_password=update[5],
                        role=update[6],
                    )
        except Exception:
            return {"message": "Could not update the user"}

    def delete_user(self, username: str) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                return True
        except Exception:
            return False

    def get_user_by_username(
        self, username: str
    ) -> Optional[UserOutWithPassword]:
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

    def get_all_users(self) -> Union[UserListOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM users
                        ORDER BY id
                        """
                    )
                    records = db.fetchall()
                    return [
                        UserOut(
                            id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            username=record[3],
                            email=record[4],
                            hashed_password=record[5],
                            role=record[6],
                        )
                        for record in records
                    ]
        except Exception:
            return {"message": "Could not get all users"}
