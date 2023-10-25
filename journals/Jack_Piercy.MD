# Week One Merge Request Journal

## Merge Request: Endpoint Security Enhancements

In this week's merge request, I focused on enhancing the security of our backend endpoints. The primary goal was to protect these endpoints, ensuring that only authenticated users could access, create, update, delete, or retrieve specific events.

### Changes Implemented

To achieve this, I introduced the following changes:

- **Endpoint Protection**: I made adjustments to all event endpoints, marking them as protected. This security enhancement means that only users who have logged in can perform any actions on these endpoints.

- **User Authentication**: I added a new parameter and implemented conditional statements within all the routes. These statements check the user's authentication status using a "Depends" mechanism to determine access rights.

### Testing the Enhancements

A crucial part of this merge request was ensuring that the changes work as intended. I created a comprehensive test plan to confirm the functionality:

1. **Documentation Check**: I started by navigating to `localhost:8000/docs` to access the API documentation.

2. **Logged Out Verification**: To ensure that only authenticated users can access the endpoints, I logged out. This involved opening the browser's developer tools, going to the "Applications" tab, and verifying the absence of a FastAPI token cookie for `localhost:8000`.

3. **Endpoint Restriction Test**: I proceeded to test the endpoints to confirm that, while logged out, I couldn't use any of the event endpoint functionalities.

4. **User Authentication**: I then either created a user account or logged in, depending on the situation. To validate my login status, I checked the browser's developer tools for the presence of a FastAPI token cookie for `localhost:8000`.

5. **Full Endpoint Functionality Test**: Once authenticated, I tested the events endpoints again to ensure that I could use all their functionalities.

### Resources Utilized

While working on this merge request, I consulted various resources, including articles and tutorials. Although I don't have specific links to share, these resources were instrumental in helping me understand and implement the necessary security enhancements.

Looking forward to feedback and the next steps in this project!

# Database Setup Journal

## Setting Up PostgreSQL Database

In this journal entry, I'd like to document the process of setting up our PostgreSQL database. This task presented some challenges, but I'm pleased to share the solution I arrived at.

### Challenges Encountered

The initial setup of the PostgreSQL database encountered a few roadblocks:

1. **Connection Configuration**: Initially, configuring the database connection posed a challenge. Getting the database to connect correctly was the first hurdle.

2. **User Privileges**: Ensuring that the user account had the appropriate privileges and permissions to interact with the database was another challenge. This was crucial for the functionality of our application.

### Steps Taken

To overcome these challenges, I followed these steps:

1. **Connection Configuration**: I double-checked the connection settings, including the host, port, database name, user, and password. By comparing these settings with the PostgreSQL server's configuration, I ensured they matched.

2. **User Privileges**: I reviewed the user privileges and granted the necessary access rights to interact with the database. This involved granting privileges for creating, modifying, and deleting tables, as well as executing stored procedures.

### Successful Database Setup

After implementing these steps and resolving the configuration and privilege issues, I am pleased to report that our PostgreSQL database is now set up and fully operational.

This successful setup is crucial for the seamless operation of our application, as it provides a stable foundation for storing and managing data.

### Future Considerations

Moving forward, it's essential to regularly maintain and back up the database to ensure data integrity and availability. Additionally, monitoring database performance and optimizing queries will be key tasks to keep our application running efficiently.

I'm excited to see our application progress with a functional database in place, and I'm prepared to address any future challenges that may arise in this context.

Looking forward to further developments in our project!



# Week 2 Journal Entries

## Merge Request: Implementing ListEvents and EventDetails Components

In this week's journal entry, I'm thrilled to report on the progress made in Merge Request #X, which addresses the implementation of the ListEvents and EventDetails components. These components play a pivotal role in enhancing our product's functionality by providing users with the ability to view and interact with events.

### High-Level Changes

Here's a summary of the significant changes that have been implemented in this merge request:

1. **ListEvents Component**: The ListEvents component has been created, serving as a fundamental building block for our product. It empowers users to list and browse through events, making event discovery an intuitive and enjoyable experience.

2. **EventDetails Component**: The EventDetails component has been skillfully developed to enable users to access in-depth information about individual events. This feature adds a layer of depth to our product, enhancing user engagement and understanding.

3. **User-Friendly Styling**: To ensure that our product boasts a visually appealing and user-friendly interface, I've meticulously applied the necessary styling to both the ListEvents and EventDetails components. A well-designed UI is critical for a positive user experience.

4. **Code Documentation**: Recognizing the importance of transparency and maintainability, I have diligently documented the code. This documentation will serve as a valuable resource for our team, promoting better understanding and future maintenance.

5. **Adherence to Best Practices**: Throughout this implementation, I've been unwavering in my commitment to adhering to best practices. This ensures that our codebase remains robust, efficient, and sustainable.

### Benefits to Our Product

The changes introduced through this merge request bestow several key benefits upon our product:

- **Enhanced User Experience**: The ListEvents and EventDetails components significantly enhance the user experience, providing users with a seamless and engaging way to discover and explore events.

- **Foundation for Future Features**: These components establish a solid foundation for upcoming features and improvements. With the capability to list and view events now in place, we have greater flexibility to innovate and expand our product.

### Test Plan

For those curious about the functional aspects of these components, the following test plan was executed:

Frontend Changes:

1. Load the application at `localhost:3000/events`.
2. Confirm that a list of all events is displayed on this page. Please note that if you are working with a fresh database, you will need to create an event at `localhost:8000` for this to work.
3. After verifying that all events are displayed, click on one of the events.
4. This action should navigate you to a new page that displays the details of the selected event.
5. A screenshot or a description of the functioning page has been included to validate the successful implementation.

### Resources

In the process of implementing these components, I referred to various resources for guidance and insight. While I regret that I can't provide specific links, these resources played a vital role in ensuring the successful development of the ListEvents and EventDetails components.


With these components now integrated into our product, we're on the cusp of delivering an even more engaging and feature-rich experience to our users.

Closing this chapter, I eagerly anticipate feedback and the next stages of our project's evolution!


# Week 2 Journal Entries

Hey there,

I wanted to share an exciting update on our project this week. In this journal entry, I'm thrilled to tell you about the cool new feature we've added to our application - the CreateEvent React component.

So, here's the deal:

**CreateEvent React Component**: This is the star of the show. We've introduced a brand new component that lets our users create events with ease. This is a game-changer for our product because it brings interactivity to a whole new level.

You can think of it as your very own event creation wizard. It's got form fields for all the event details you can imagine - the event name, a picture URL to make it visually appealing, a little description to let people know what it's all about, the event location, and the date when it's happening. We've made it super user-friendly to ensure our users can effortlessly add events.

But here's where it gets interesting - we didn't stop at just creating a form. We implemented form validation to make sure the date is in the right format, "YYYY-MM-DD". It might sound like a small thing, but it's a big deal because it keeps our data clean and reliable.

And here's the magic: When a user fills out this form and hits that submit button, it doesn't just stay on the frontend. Nope, it talks to our backend through a POST request and creates a brand new event on the server. That's right, it's like a seamless connection between what the user sees and what happens behind the scenes.

**Why It Matters**: This new feature is a game-changer for our product. It lets users easily create and add events, making our platform more dynamic and engaging. It's about giving our users the power to contribute and interact. Plus, it sets the stage for even more exciting features in the future.

**Test Plan**: To make sure it all works as planned, we put it to the test:

1. Go to `localhost:3000/events/create` (or wherever your test starts).
2. Try filling out the form, but type the date in the wrong format - just to see the validation in action.
3. Then, fill out the form correctly and hit submit.

**Resources**: While working on this, we looked at various resources to get things right. Sorry, I don't have specific links to share, but trust me, they were super helpful in making this happen.

This is a big step forward in our project, and it's got me excited about what we can do next. With the CreateEvent component in place, we're not just creating events; we're creating opportunities for our platform to grow and evolve.

# Week 3 Journal Entries

So, this week, I've got something exciting to share with you – the User Event Search functionality. It's a cool feature we've added to our project that's going to make life easier for our users.

**User Event Search Functionality**: We've made it possible for users to search for events by their IDs. Simple, right? But it's a game-changer for us.

Here's what's cooking:

- We introduced a new state variable called `searchInput` to store what users type in.
- Then, we added a search input field to the app. Users can now enter keywords to search for events.
- The magic happens when we filter user events based on the event ID. So, when you input a specific ID, the app shows you only those events. It's like a spotlight on the exact event you're after.

**Why It's Awesome**: This is all about improving the user experience. Users can quickly find and engage with the events that matter to them, and that's a big win for all of us.

**Testing**: We made sure it works as planned. Here's what we did:

**Frontend Changes**:

1. We started fresh by dropping tables and doing our migrations again.
2. Created a user, an event, and a user-event at `localhost:8000/docs`.
3. Repeated the process on a separate account.
4. Opened the app at `localhost:3000/user/events`.
5. Clicked the search input field.
6. Entered a keyword and hit "Search."
7. Verified that the user events displayed were filtered based on our input.

**Resources**: We didn't need any external help this time. It was all about our team coming together and making it happen.

This new feature is not just about improving usability; it's about boosting user engagement and satisfaction. Stay tuned for more in the coming weeks. Can't wait to see what's next!



# Week 3 Journal Entries

Alright, it's that time of the week again, and I'm here to share what we've been up to in our latest GitLab Merge Request. This one is all about enhancing our Event Details page, and trust me, it's pretty exciting stuff.

**Dev Summary**: In this Merge Request (MR), I've rolled out some fresh functionality to our Event Details page. The standout feature? Users can now sign up for events. And once they've signed up, guess what? The event magically appears in their events tab. Pretty cool, right? This is all about making our platform even more user-friendly and engaging.

**High-Level Changes**: Here's a quick overview of what's been happening:

- We've added a shiny new "Sign Up for Event" button to the Event Details page. It's like a golden ticket to join the event.
- Oh, and we've also supercharged our error handling for event registration. So if something goes wrong, we've got it covered.

**Changes Made**: Let's get into the nitty-gritty of what we've done:

**Frontend Changes**:

- You'll notice that fresh "Sign Up for Event" button on the Event Details page. It's like a virtual handshake to join in the fun.
- We've created a cool function called `handleSignUp`. This little guy sends a POST request to the backend to officially register the user for the event.
- And when it comes to error handling, we've made it smoother than ever for event registration.

**Backend Changes**:

- Over on the backend, we've added a brand new endpoint. It's like a backstage pass to handle event registration.
- We've cooked up a POST request, and it's all about letting users sign up for events with a breeze.

**Test Plan**: We've put this MR to the test to make sure everything is working as expected:

**Frontend Changes**:

1. First things first, visit `localhost:3000/events`.
2. Click on any event (make sure you're logged in).
3. Now, here comes the magic - click the "Sign Up for Event" button.
4. Compare this to before; that button didn't even exist. But now, it's there, and it works like a charm.
5. Finally, navigate to `localhost:3000/user/events` and make sure that event is right there on that page. It's like your stamp of approval.

No fancy resources were needed for this one; it was all in-house talent.

This new feature brings our Event Details page to life. Users can easily join events, and it's like putting the power in their hands.





# Week 3 Journal Entries



This week's journal entry is all about the latest Merge Request we've been working on. It's all about styling enhancements, and let me tell you, it's all about giving our EventDetails component a little makeover.

**Merge Request: Styling Enhancements**

**Dev Summary**: So, in this MR, we've put on our design hats and spruced up the EventDetails component. Now, before you get too excited, let me be clear - we haven't changed any functionality here. This one's all about visuals. We've aimed to make it look sleeker and more appealing.

**Changes Made**: Alright, let's get into the specifics:

- We went deep into the styling of the EventDetails component and gave it a fresh new look. Think of it as a room that just got a makeover; everything is in its place, and it looks fantastic.
- We rethought the layout and polished the visual elements. The goal here was to enhance the overall user experience. You know, make it more pleasant to navigate and explore.

**Test Plan**: We want to make sure everything looks just right. So here's what we did to check our work:

**Frontend Changes**:

1. First things first, load up the application at `localhost:3000/events`. It's like the grand opening of our freshly styled EventDetails component.
2. Click on any event to view its detail page. Take your time and enjoy the view.
3. You'll notice the styling changes we've made. It's like admiring a well-decorated room - everything just feels right.

No fancy resources were needed for this one. It was all about our team's creativity and a keen eye for design.

**MR Submission Ready**: And you know what? This MR is ready for submission. Here's why:

- It's up-to-date with the main branch. We're right in sync with the latest.
- We've opted for the "Squash and merge" option. It's like tidying up after a successful project.
- Of course, we've cleaned up any commented or unused code. A tidy codebase is a happy codebase.
- And, as always, we've linked the GitLab issue (#31) to this MR. It's all part of our process.

So, while this MR doesn't introduce new features, it's all about making our platform more visually appealing. A little touch-up can go a long way, right?






# Week 4 Journal Entries



We're into week 4, and it's time to talk about our latest Merge Request. This one is all about style and functionality, and it's designed to make our user events page a whole lot better.

**Dev Summary**: In this MR, we've added a couple of important elements. First, we've given the page a fresh coat of style, making it look and feel better than ever. But that's not all - we've also introduced a "Delete" function for user events. So, it's all about aesthetics and control.

**Changes Made**: Let's dive into the specifics of what we've done:

- We've spent some quality time on the user events page, styling it up to give it a more appealing look and feel. It's like giving your favorite room a makeover; suddenly, it's more enjoyable to be there.
- The big feature here is the "Delete" function. Users can now remove events from their list. It's all about giving them control and making their experience even better.

**Test Plan**: We've thoroughly tested this MR to ensure everything is working as expected. Here's how you can do it:

**Frontend Changes**:

1. First, head on over to `localhost:3000/user/events`. This is where the magic happens.
2. Click on the "Cancel" button. It's your ticket to remove events.
3. Take a moment to appreciate the styling. It's like a breath of fresh air.
4. Compare this to the "Before" - that "Cancel" button wasn't even there. But now, it's here, and it does exactly what you'd expect.

The MR is almost ready for submission, and here's why:

- It's up-to-date with the main branch. We're right on track with the latest changes.
- We've chosen the "Squash and merge" option, ensuring that our codebase stays tidy.
- Of course, we've done a little cleaning too, removing any commented or unused code. It's like decluttering for a fresh start.
- And, yes, we've got the GitLab issue (#33) linked to this MR. It's all part of our process.

This MR is a big step forward, improving both the style and functionality of our user events page. Users can now have their events their way.




# Week 4 Journal Entries



This week, I'm super excited to talk about the latest Merge Request that's making our application even more user-friendly. This one's all about a custom styled navbar, and trust me, it's a game-changer for our user experience.

**Dev Summary**: In this MR, we've brought a custom styled navbar to the scene. You know, that essential navigation menu at the top of our app? We've given it a makeover, making it not just functional but visually appealing.

**Changes Made**: Let's dive into the specifics of what we've done:

- We created a custom styled navbar component that's not only practical but also looks fantastic. It's like giving our application a brand new outfit.
- We added icons and links for easy navigation. It's all about making it a breeze to move around our app.
- We implemented open and close functionality for the drawer. It's a small touch that adds to the overall user-friendliness.
- And, of course, we styled the navbar to be responsive, ensuring it adapts to different screens and devices.

**Why**: This enhancement is all about improving the user experience. It gives us a consistent and visually appealing navigation menu. Users can now easily hop between different sections of the application, making it all the more user-friendly.

**Test Plan**: We've tested this MR to make sure everything is in tip-top shape. Here's how you can check it out:

**Frontend Changes**:

1. Open the application at `localhost:3000/sidebar`. That's where you'll see our custom styled navbar in action.
2. Ensure the styling is all spot-on and that you can click into the events links. (Don't worry; we'll be adding more links later.)

No fancy resources were needed for this one. It was all about our team's creativity and an eye for detail.

**Submission Ready**: This MR is nearly ready for submission, and here's why:

- It's up-to-date with the main branch. We're right on track with the latest changes.
- We've opted for the "Squash and merge" option, ensuring that our codebase stays tidy.
- Of course, we've cleaned up any commented or unused code. A tidy codebase is a happy codebase.
- And, yes, we've got the GitLab issue (#38) linked to this MR. It's all part of our process.

This custom styled navbar brings a breath of fresh air to our application. It's not just about functionality; it's about looking good while doing it.




# Week 4 Journal Entries



In our Week 4 Journal, I'm thrilled to share the latest development – the Styling and Functionality update for our Navbar Component. It's all about making our application visually pleasing and enhancing the user experience.

**Dev Summary**: In this Merge Request (MR), we've given a lot of love to our Navbar component. There are two major aspects to it. First, we've improved the styling for a sleeker and more appealing look. But that's not all; we've also added dynamic rendering of menu items based on the user's role. Admins get additional menu options. So, it's about style and substance!

**Changes Made**: Let's dive into the specifics of what we've done:

- We've taken a deep dive into styling the Navbar, making it look better than ever. It's like giving our app a fresh coat of paint.
- The dynamic rendering is a game-changer. Now, the Navbar shows different menu items depending on the user's role. Admins see additional options, making their experience even better.
- We've reorganized the menu items to create a more user-friendly layout. It's all about making navigation a breeze.

**Test Plan**: We've thoroughly tested this MR to ensure everything is working as expected. Here's how you can check it out:

**Frontend Changes**:

1. Visit `localhost:3000/` 
2. Click the hamburger menu and navigate through all the pages to make sure they work (you'll need to be an admin to see all the pages).
3. Then, switch to a regular user account. You should only see events, my events, the food kitchen, and home.
4. Finally, log out completely and navigate to the home page. Make sure you can only see the food kitchen and home.

We haven't needed any external resources for this; it's all about our in-house expertise.

**Submission Checklist**:

- It's up-to-date with the main branch. We're in sync with the latest changes.
- We've opted for the "Squash and merge" option to keep things tidy.
- We've cleaned up any commented or unused code. A clean codebase is a happy codebase.
- We've also linked the GitLab issue (#41) to this MR. It's all part of our process.

This Navbar Component update is all about creating a visually appealing and intuitive navigation system. Users can now enjoy a stylish and user-friendly experience.

# Week 4 Journal Entries



In our Week 4 Journal, I'm excited to share the latest improvements we've made in the ListUserEvents page. It's all about giving our users a better experience and enhancing the overall look and feel.

**Dev Summary**: In this Merge Request (MR), we've focused on styling enhancements for our ListUserEvents page. It's all about making it more visually appealing, ensuring consistency, and providing a user-friendly interface. We've also fixed some URLs for the deployed website.

**Changes Made**: Let's dive into the specifics of what we've done:

- We've given the user event cards a fresh makeover. It's like dressing them up for a special occasion. The improved styling makes them stand out and look great.
- The layout and alignment of card elements have been enhanced. Everything is in its right place, creating a cleaner and more organized look.
- We've updated the colors to match our branding guidelines. It's all about staying on-brand and providing a consistent experience.

**How this Benefits Our Product**: These styling enhancements are all about improving our ListUserEvents page. A well-designed user interface can have a significant impact on user engagement and satisfaction. By presenting user events in a better way, we're enhancing the overall user experience. This can lead to increased user retention and satisfaction, which is always a win.

**Test Plan**: We've made sure to test everything thoroughly. Here's how you can check it out:

**Frontend Changes**:

1. Visit `localhost:3000/user/events` (or the initial page where your test starts).
2. Take a moment to appreciate the styling. It's like seeing a well-decorated room.
3. And after we merge, just wait for about 10 minutes and test those navbar links. Everything should work seamlessly.

We haven't needed any external resources for this; it's all about our in-house creativity.

**Submission Checklist**:

- It's up-to-date with the main branch. We're in sync with the latest changes.
- We've opted for the "Squash and merge" option to keep things tidy.
- We've cleaned up any commented or unused code. A clean codebase is a happy codebase.
- We've also linked the GitLab issue (#46) to this MR. It's all part of our process.

These improvements in the ListUserEvents page make it more user-friendly and visually appealing. It's all about enhancing the experience for our users.

