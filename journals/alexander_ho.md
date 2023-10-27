# Alex's Helping Hands Journal

## Thu Oct 26

Today I worked on:

- We spent the day finalizing our readme.md file. We added a site description, posted about our endpoints, and gave instructions on how to clone and run our project.
- We evaluated different design decisions that we could implement after grading for our stretch goals.

## Wed Oct 25

Today I worked on:

- Tested deployed version of our website. We noticed that several create pages were not working. Noted an error with HTTPS redirecting into HTTP requests.
- We spent most of the day analyzing this problem and worked with instructor Bart to figure out what happened. Turns out front end JS files that make API calls sometimes had mismatches with ending backslashes.
- In the evening I evaluated and reviewed a merge request from Arianny on the creation of an admin page to manage site users.

## Tue Oct 24

Today I worked on:

- Adding Material UI styling to several front-end pages: Meals List, Meal Detail, and Create Meal pages.
- Tested deployed version of our website. We noticed that some URLs were not working.

## Mon Oct 23

Today I worked on:

- We had our practice exam today.
- Worked on building unit tests for most of the meals endpoints.
- Some endpoints need a user dependency override
- One blocker was that the tests were not running on the terminal. It turns out I had to run them on the docker terminal.

## Thu Oct 19

Today I worked on:

- Finally resolved deploying front-end of our website through a setting in GitLab that was generating a different link.
- I realized that different pipelines were running during commits and others (such as deploy) after a merge.
- I helped review several merge requests from teammates that enhanced our site functionality.

## Wed Oct 18

Today I worked on:

- Finished building page for a Meal Detail
- Began working on attempting to deploy app. Successfully deployed back-end.
- Ran into trouble deploying app because our program was not passing the front end build test.
- Noted that front-end build test wants useEffect() in react to place functions into dependency array, which leads to feedback loop

## Tue Oct 17

Today I worked on:

- Successfully merged Create Meal page
- Began building a react page for Meal Detail

## Mon Oct 16

Today I worked on:

- Started and built front-end page to create a MEAL.
- Reviewed, tested, and revised Arianny's new backend feature to protect endpoints for admin users (sub-classification of user)

## Fri Oct 13

Today I worked on:

- Finished and merged RESERVATIONS endpoints
- Reviewed changes to all endpoints to protect access to tokenholders

## Thu Oct 12

Today I worked on:

- Completed and reviewed the MEALS endpoints with Arianny
- Created a table for RESERVATIONS
- Wrote API endpoints for RESERVATIONS

Our Team:

- Created a preliminary login page for users
- Created an Events List page
- Created a search bar for events

## Wed Oct 11

Today I worked on:

- Updated the USERS endpoints to be protected by a user wall. Thus we had to revisit this endpoint before merging to main.
- Created a table for MEALS.
- Wrote the Create and Update functions for MEALS.

Our Team:

- Completed the USER_EVENTS table and endpoints
- Began creating front-end react pages for EVENTS

## Tue Oct 10

Today I worked on:

- I partnered with Arianny to complete the remainder of the USER table API endpoints. We wrote the routers and queries for the get all, get one, delete, and update functions.
- We noted that to udpate a USER, a password might need to be re-hashed. This made creating this endpoint a little bit more challenging to get done correctly.

The remainder of our team worked on finishing the USER_EVENTS endpoints.

## Mon Oct 9

Today I worked on:

- Creating a new issue and branch on GitLab to document our upcoming task of completing the USER table API endpoints.
- I reviewed and tested a merge request to update the protection of our events endpoints

Our Team:

- worked on starting the endpoints for the user_events table

## Thu Sep 28

Today I worked on:

- assisting my team on the writing of all 5 Events endpoints

Our team refernced example code from a FastAPI lecture and replicated it on our backend for our Events table. We created create, delete, update, get, and get all endpoints for our events table object. All members took turns piloting and navigating in an attempt to code together and learn the material.

## Wed Sep 27

Today I worked on:

- writing the endpoints to create a user
- writing the endpoints for the login / logout function

Our team began by completing and finalizing the events, user, and user_events tables using SQL notation. We verified the data types and schema together so it would be correct before starting our API endpoints.

Once the schema was ready, we moved onto the user authentication process, which would involve creating a user and authenticating a login. This task took us over 4 hours to write, debug, and get operational.

## Tue Sep 26

Today I worked on:

- helping my team write its initial migration tables

We put together initial migration tables after completing our api endpoint design using that schema.

## Mon Sep 25

Today I worked on:

- installing a PostgreSQL volume into our docker container and connecting it to our api service.

Our group tried emulating example code to connect a SQL database volume. We elected to use a SQL type database as opposed to a NoSQL (Mongo) DB due to the relational aspect of our data.
