# [Interview Scheduler](https://romantic-meninsky-7e0882.netlify.app/)
Interview Scheduler is a single page full stack web application that uses Javascript, ReactJS, SCSS and an API that uses NodeJS with PostgreSQL. The application allows you to book interviews for students with interviewers for any weekday and you can also cancel and edit interviews.
##### Click on the title of the app to see a live demo!

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshots

![Screen Shot 2020-10-07 at 10 15 03 PM](https://user-images.githubusercontent.com/56459037/95417756-a8112f00-08ea-11eb-913c-5674f3c86050.png)

![Screen Shot 2020-10-07 at 10 18 37 PM](https://user-images.githubusercontent.com/56459037/95417925-1fdf5980-08eb-11eb-82d8-efbbbea2fef8.png)

### Functional

- Development focuses on a single page application (SPA) called Interview Scheduler, built using React.

- Data is persisted by the API server using a PostgreSQL database.

- The client application communicates with an API server over HTTP, using the JSON format.

- Jest tests are used through the development of the project.

### Behavioural

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

### Technical Specifications

- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library

The Scheduler client application created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

### Stretch Specifications

- The client application communicates with a WebSocket server.
- When a user books or cancels an interview, all connected users see the update in their browser.
- WebSockets

### Reference

- React Documentation
- Storybook Documentation
- Jest Documentation
- Axios Example
