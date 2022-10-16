# Project 14

### Around the U.S. project on React, featuring authorization and registration.

### View the project here: https://jakoborion.github.io/react-around-auth/

![Project 14 Screenshot](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5f669610-77e9-4c29-882e-a4f05029e31b%2FUntitled.png?table=block&id=e7d5a5f5-5723-4bba-af0a-0500403eed14&spaceId=9e4bd47b-c6e6-4ca3-bcee-279794b47315&width=1600&userId=f7286ea6-b662-4c80-bbc5-38e7c4ca3cfd&cache=v2)

-   ### Creating Routes and Redirecting

    Implemented two new routes for unauthorized users in a separate auth.js file:

    `/signup` _— for user registration_
    
    `/signin` _— for user authorization_

    If an unauthorized user visits the application, they should be redirected to the login page, regardless of the route they accessed.

-   ### Creating New React Components

    Revised JSX and CSS, added new components:

    `Login` _— the component for user authorization with the necessary state variables_

    `Register` _— the component for user registration with the necessary state variables_

    `ProtectedRoute` _— use this component to protect the / route so that unauthorized users can't access it_

    `InfoTooltip` _— a modal window component that informs the user whether they've been registered successfully_

-   ### Connecting the Site Main Functionality to the Practicum Back-End

-   ### Implementing User Authentication

-   ### Implementing Local Storage and Token Manipulation
