steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(150) NOT NULL,
            last_name VARCHAR(150) NOT NULL,
            phone VARCHAR(12),
            meal_id INT REFERENCES meals(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reservations;
        """,
    ]
]
