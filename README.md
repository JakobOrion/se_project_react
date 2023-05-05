# Project 14

### Around the U.S. project on React, featuring authorization and registration.

### View the project here: https://jakoborion.github.io/se_project_react/

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
