steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_events (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            event_id VARCHAR(255) REFERENCES events(event_name)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_events;
        """
    ]
]
