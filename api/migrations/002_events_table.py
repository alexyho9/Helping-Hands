steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY,
            event_name VARCHAR(200) NOT NULL,
            picture_url VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            location VARCHAR(150) NOT NULL,
            date VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """
    ]
]