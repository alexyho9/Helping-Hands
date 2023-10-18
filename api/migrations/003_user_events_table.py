steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_events (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            event_id VARCHAR(255) REFERENCES events(event_name) ON DELETE
            CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_events;
        """
    ]
]
