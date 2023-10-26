# SCHEMA



### Users

The Users table represents user accounts.

| Field        | Type                | Unique | Optional |
|--------------|---------------------|--------|----------|
| id           | SERIAL              | yes    | no       |
| first_name   | VARCHAR(100)        | no     | no       |
| last_name    | VARCHAR(100)        | no     | no       |
| username     | VARCHAR(100) UNIQUE | yes    | no       |
| email        | VARCHAR(150) UNIQUE | yes    | no       |
| hashed_password | VARCHAR(2000)   | no     | no       |
| role         | VARCHAR(100)        | no     | no       |







### Events

The Events table represents information about events.

| Field        | Type                | Unique | Optional |
|--------------|---------------------|--------|----------|
| id           | SERIAL              | yes    | no       |
| event_name   | VARCHAR(200) UNIQUE | no     | no       |
| picture_url  | TEXT                | no     | no       |
| description  | TEXT                | no     | no       |
| location     | VARCHAR(150)        | no     | no       |
| date         | VARCHAR(100)        | no     | no       |





### User Events

The User Events table represents the relationship between users and events.

| Field     | Type               | Unique | Optional |
|-----------|--------------------|--------|----------|
| id        | SERIAL             | yes    | no       |
| user_id   | INT (REFERENCES users(id) ON DELETE CASCADE) | no | no |
| event_id  | VARCHAR(255) (REFERENCES events(event_name) ON DELETE CASCADE) | no | no |




### Meals

The Meals table represents information about meals.

| Field        | Type              | Unique | Optional |
|--------------|-------------------|--------|----------|
| id           | SERIAL            | yes    | no       |
| title        | VARCHAR(200) NOT NULL | no | no       |
| date         | VARCHAR(100) UNIQUE NOT NULL | no | no |
| description  | TEXT              | no     | yes      |
| image_url    | VARCHAR(250)      | no     | yes      |
| capacity     | SMALLINT          | no     | yes      |




### Reservations

The Reservations table represents reservations made for meals.

| Field        | Type                | Unique | Optional |
|--------------|---------------------|--------|----------|
| id           | SERIAL              | yes    | no       |
| first_name   | VARCHAR(150) NOT NULL | no     | no       |
| last_name    | VARCHAR(150) NOT NULL | no     | no       |
| phone        | VARCHAR(12)         | no     | yes      |
| meal_id      | INT (REFERENCES meals(id) ON DELETE CASCADE) | no | no |

