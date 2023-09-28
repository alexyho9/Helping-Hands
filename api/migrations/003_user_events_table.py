steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE user_events (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            event_id INT REFERENCES events(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE user_events;
        """
    ]
]