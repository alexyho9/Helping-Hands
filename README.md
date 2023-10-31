# Module3 Project Gamma

## About Helping Hands

Helping Hands is a Non-Profit organization that attempts to harness the potential of motivated individuals to work together and solve problems in the community. Volunteers can sign up to view different volunteering events coming up in their area, and also sign up to attend those events. Registered volunteers are given a profile and can manage their events from the webpage.

In addition, Helping Hands has an onsite community kitchen which serves food daily to the community free of charge. Guests are able to see the list of upcoming meals and sign up for a spot at that meal. Non-profit staff is also able to see the list of meal reservations to anticipate a meal’s attendance.

# Admin Features

Our application provides a robust set of administrative features ensuring a seamless management experience. The following are some of the core admin features:

## Event Management

- **Create Event**: Admins can create new events, specifying details like event name, picture URL, description, location, and date.
- **Update Event**: Modify existing events, updating any of the provided details.
- **Delete Event**: Remove events from the system.
- **View Full List of Events**: Admins have the ability to view a complete list of all events within the system.

## Meal Management

- **Create Meal**: Create new meals with details like title, date, description, image URL, and capacity.
- **Update Meal**: Modify existing meals, updating any of the provided details.
- **Delete Meal**: Remove meals from the system.
- **View Full List of Meals**: Admins can view a comprehensive list of all meals within the system.

## Reservation Management

- **View All Reservations**: Retrieve a list of all reservations made within the system.
- **View Full List of Reservations**: Admins have the ability to view a complete list of all reservations within the system.

## User Management

- **Promote/Demote Users**: Admins can promote regular users to admin status or demote admins to regular user status.
- **Update User Information**: Admins can update user information including contact details and other profile information.
- **Delete User**: Admins have the ability to delete a user from the system.

The aforementioned features are secured, ensuring that only authorized administrative users can access and modify the data. Unauthorized access attempts to these endpoints will result in a 401 Unauthorized response.

## Design

- [ ] Wire-frame diagrams
- [API Documentation](docs/API.md)
- [Schema](docs/Schema.md)
- [ ] GitLab issue board is setup and in use (or project management tool of choice)
- [ ] Journals

#### Your GitLab pages URL

https://git-jala.gitlab.io/helping-hands

## How to Run Helping Hands on your Local Device

1. In your terminal and in your desired directory type the follow command:

```
git clone https://gitlab.com/git-jala/helping-hands.git
```

2. cd into the project directory

```
cd helping-hands
```

3. Make sure you have Docker installed then in your terminal type the following commands:

```
docker volume create hands-data
```

- This will create the Docker database.

```
docker compose build
```

- This will create the Docker containers and images.

```
docker compose up
```

- This will run the Docker containers

4. When the Docker containers are running make sure to check the api container because on inital setup it will sometimes turn off all you need to do is click the start button to get going again and it will work from then on.

5. When the Docker containers are running you can open your browser and go to [http://localhost:8000/docs](http://localhost:8000/docs) to view all of the RESTful backend endpoints.

6. When the Docker containers are running you can open your browser and go to [http://localhost:3000](http://localhost:3000).
   - This will take you to the project home page and you can navigate via the navbar dropdown menu.

## Diagram

![Screenshot_2023-10-27_at_2.08.53_PM](/uploads/5a70108105053f5f8ddbb1a657015cba/Screenshot_2023-10-27_at_2.08.53_PM.png)
