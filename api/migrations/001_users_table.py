steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            hashed_password VARCHAR(2000) NOT NULL,
            role VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
