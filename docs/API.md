# API Endpoints

## Users
- [Get Token](#get-token)
- [Get All Users](#get-all-users)
- [Create User](#post-create-user)
- [GET User By Username](#get-user-by-username)
- [PUT Update User](#update-user)
- [DELETE Delete User](#delete-user)
- [GET Account Data](#get-account-data)

## Authentication
- [Login](#post-login)
- [Logout](#delete-logout)

## Events
- [Get All Events](#get-all-events)
- [POST Create Event](#create-event)
- [GET Event](#get-event)
- [PUT Update Event](#update-event)
- [DELETE Delete Event](#delete-event)

## User Events
- [POST Create User Event](#create-user-event)
- [GET All User Events](#get-all-user-events)
- [DELETE Delete User Event](#delete-user-event)

## Meals
- [Get All Meals](#get-all-meals)
- [POST Create Meal](#create-meal)
- [GET Meal](#get-meal)
- [PUT Update Meal](#update-meal)
- [DELETE Delete Meal](#delete-meal)

## Reservations
- [GET Reservations By Meal](#get-reservations-by-meal)
- [POST Create Reservation](#create-reservation)
- [DELETE Delete Reservation](#delete-reservation)
- [GET All Reservations](#get-all-reservations)







# Users

## GET Token

GET /token HTTP/1.1

Response: Get Token

Response Shape (JSON):

```json
{
  "access_token": "your_access_token",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": "user"
  }
}
```

## GET All Users

GET /api/users/ HTTP/1.1

Response: Get All Users

Response Shape (JSON):

```json
{
  "users": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "role": "user"
    },
    {
      "id": 2,
      "first_name": "Jane",
      "last_name": "Smith",
      "username": "janesmith",
      "email": "janesmith@example.com",
      "role": "user"
    }
  ]
}
```

## POST Create User

POST /api/users/ HTTP/1.1

Response: Create User

Response Shape (JSON):

```json
{
  "access_token": "your_access_token",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": "user"
  }
}
```

## Get User By Username

GET /api/users/{username} HTTP/1.1

Response: Get User By Username

Response Shape (JSON):

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "role": "user"
}
```

## Update User

PUT /api/users/{username} HTTP/1.1

Response: Update User

Response Shape (JSON):

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "role": "user"
}
```

## Delete User

DELETE /api/users/{username} HTTP/1.1

Response: Delete User

Response Shape (JSON):

```json
true
```

## Get Account Data

GET /api/userdata HTTP/1.1

Response: Get Account Data

Response Shape (JSON):

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "role": "user"
}
```


# Authorization/Authentication

## POST Login

- **Method**: POST
- **Path**: `/token`
- **Content-type**: application/x-www-form-urlencoded

Request Body:
- username: your_username
- password: your_password

Response: Account information and a token

Response Shape (JSON):

```json
{
  {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3N2Y2NjI5My1mNjg0LTRlODQtODRiNi1mYzc3NWNkM2U3MTQiLCJleHAiOjE2OTgzNDM1NjAsInN1YiI6Impkb2VAZXhhbXBsZS5jb20iLCJhY2NvdW50Ijp7ImlkIjoyLCJmaXJzdF9uYW1lIjoiam9obiIsImxhc3RfbmFtZSI6ImRvZSIsInVzZXJuYW1lIjoiamRvZSIsImVtYWlsIjoiamRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiJ9fQ.CMwggSWb011KhnaM-nxYaG7n2ISBC45x-kSrCyFroUw",
  "token_type": "Bearer"
}
}
```

## DELETE Logout

- **Method**: DELETE
- **Path**: `/token`
- **Header**: Authorization: Bearer your_token

Response: Always true

Response Shape (JSON):

```json
{
  "deleted": true
}
```




# Events

## Get All Events

GET /api/events/ HTTP/1.1

Response: Get All Events

Response Shape (JSON):

```json
[
  {
    "id": 1,
    "event_name": "Summer Festival",
    "picture_url": "https://example.com/summerfest.png",
    "description": "Join us for the summer festival!",
    "location": "Central Park",
    "date": "2023-07-15"
  },
  {
    "id": 2,
    "event_name": "Tech Conference",
    "picture_url": "https://example.com/techconf.png",
    "description": "Explore the latest in technology.",
    "location": "Convention Center",
    "date": "2023-09-20"
  }
]
```

## Create Event

POST /api/events/ HTTP/1.1

Response: Create Event

Response Shape (JSON):

```json
{
  "id": 3,
  "event_name": "Music Concert",
  "picture_url": "https://example.com/concert.png",
  "description": "An evening of live music.",
  "location": "Music Arena",
  "date": "2023-11-05"
}
```

## Get Event

GET /api/events/{event_id}/ HTTP/1.1

Response: Get Event

Response Shape (JSON):

```json
{
  "id": 1,
    "event_name": "Summer Festival",
    "picture_url": "https://example.com/summerfest.png",
    "description": "Join us for the summer festival!",
    "location": "Central Park",
    "date": "2023-07-15"
}
```

## Update Event

PUT /api/events/{event_id}/ HTTP/1.1

Response: Update Event

Response Shape (JSON):

```json
{
  "id": 2,
  "event_name": "Tech Conference",
  "picture_url": "https://example.com/techconf.png",
  "description": "Explore the latest in technology.",
  "location": "Convention Center",
  "date": "2023-09-20"
}
```

## Delete Event

DELETE /api/events/{event_id}/ HTTP/1.1

Response: Delete Event

Response Shape (JSON):

```json
true
```






# User Events

## Create User Event

POST /api/user/events/ HTTP/1.1

Response: Create User Event

Response Shape (JSON):

```json
{
  "id": 1,
  "user_id": 123,  
  "event_id": "Summer Festival"  
}
```

## Get All User Events

GET /api/user/events/my-events/ HTTP/1.1

Response: Get All User Events

Response Shape (JSON):

```json
[
  {
    "id": 1,
    "user_id": 123,  
    "event_id": "Tech Conference"  
  }
]
```

## Delete User Event

DELETE /api/user/events/{user_event_id}/ HTTP/1.1

Response: Delete User Event

Response Shape (JSON):

```json
true
```



# Meals

## Get All Meals

GET /api/meals/ HTTP/1.1

Response: Get All Meals

Response Shape (JSON):

```json
[
  {
    "id": 1,
    "title": "Delicious Dinner",
    "date": "2023-10-26",
    "description": "A scrumptious meal for food lovers.",
    "image_url": "https://example.com/meal1.jpg",
    "capacity": 100
  }
]
```

## Create Meal

POST /api/meals/ HTTP/1.1

Response: Create Meal

Response Shape (JSON):

```json
{
  "id": 2,
  "title": "Lunch Special",
  "date": "2023-10-27",
  "description": "A mouthwatering lunch option.",
  "image_url": "https://example.com/meal2.jpg",
  "capacity": 80
}
```

## Get Meal

GET /api/meals/{meal_id}/ HTTP/1.1

Response: Get Meal

Response Shape (JSON):

```json
{
  "id": 1,
  "title": "Delicious Dinner",
  "date": "2023-10-26",
  "description": "A scrumptious meal for food lovers.",
  "image_url": "https://example.com/meal1.jpg",
  "capacity": 100
}
```

## Update Meal

PUT /api/meals/{meal_id}/ HTTP/1.1

Response: Update Meal

Response Shape (JSON):

```json
{
  "id": 1,
  "title": "Updated Dinner",
  "date": "2023-10-26",
  "description": "An improved version of the delicious dinner.",
  "image_url": "https://example.com/meal1-updated.jpg",
  "capacity": 120
}
```

## Delete Meal

DELETE /api/meals/{meal_id}/ HTTP/1.1

Response: Delete Meal

Response Shape (JSON):

```json
true
```

Certainly, here is the "Reservations" section with the specified format:

# Reservations

## Get Reservations By Meal

GET /api/meals/{meal_id}/reservations/ HTTP/1.1

Response: Get Reservations By Meal

Response Shape (JSON):

```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123-456-7890",
    "meal_id": 1
  }
]
```

## Create Reservation

POST /api/meals/{meal_id}/reservations/ HTTP/1.1

Response: Create Reservation

Response Shape (JSON):

```json
{
  "id": 2,
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "987-654-3210",
  "meal_id": 1
}
```

## Delete Reservation

DELETE /api/reservations/{reservation_id}/ HTTP/1.1

Response: Delete Reservation

Response Shape (JSON):

```json
true
```

## Get All Reservations

GET /api/reservations/ HTTP/1.1

Response: Get All Reservations

Response Shape (JSON):

```json
"string"
```

