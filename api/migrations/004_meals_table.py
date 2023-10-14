steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE meals (
            id SERIAL PRIMARY KEY,
            title VARCHAR(200) NOT NULL,
            date VARCHAR(100) UNIQUE NOT NULL,
            description TEXT,
            image_url VARCHAR(250),
            capacity SMALLINT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE meals;
        """
    ]
]
