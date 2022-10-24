# MESTO x REACT

## Have a look at the project

<https://around.nomoredomains.sbs>

Public IP of the server: `51.250.96.109`

## Description

Simple interactive gallery where users can share pictures. During the first sprints of the course the project was written in pure JavaScript ([Link to the repository](https://github.com/artemshchirov/around)), the current project was aiming to implement the same functionality using React library and JSX syntax.

## Functionality

- Registration and authorization of users in the service
- React routing protects the content of the main page from unauthorized access
- User gets redirected from the login and signup pages depending on their being authorized
- Users are identified with the help of tokens
- The feedback about the success/fail in the registration is shown when it's finished.
- Adding new cards to the grid
- Deleting cards created by the user
- Editing user profile information
- Form validation on the client side
- Communication with external API to fetch and patch/delete data

## Technologies used

- React JS
- Webpack
- Functional components
- React routing
- Basic JSX
- JSX lists and events
- Imperative and declarative approaches to programming
- Functional and Class Components
- Creating a new project in React
- Project structures
- Debugging and React DevTools
- Hooks and effect dependencies
- Lifting state
- Global state
- Creating and subscribing to a context
- Asynchronous JavaScript
- Working with forms
- Refs

## To Do

- [x] Localization
- [ ] Hamburger menu on screens < 768px

## Install and run the project

```bash
git clone https://github.com/artemshchirov/react-around-api-full.git
cd frontend/
npm install
npm run build
npm run start
```

### Further improvements

Full repository with both frontend and backend ([link to the repository](https://github.com/artemshchirov/react-around-api-full)) and the backend was written for it ([backend repository](https://github.com/artemshchirov/express-around)).
