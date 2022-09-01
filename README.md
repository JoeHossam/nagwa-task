# Nagwa Technical task

This application is about categorizing words and getting a final rank.

## How to install

You can install the application by following these steps:

1. Navigate to the desired location on your computer and pen the command prompt.
2. run `git clone https://github.com/JoeHossam/nagwa-task`.
3. Navigate to the project folder by running `cd .\nagwa-task\`.
4. Run `npm install`, to install the required package for this project.
5. Run `npm run setup`, to install all the packages for both client and server.
6. Run `npm run dev`, to start both servers.
    > **NOTE:** It will take some time. A browser tab will open when it is ready.

## Project is split into parts

1.  ### Backend (Express)

    Once the server is up you can test the API on (http://localhost:3001)[http://localhost:3001].

    #### API Routes

    1. `GET /word`, to get 10 random words, the array returned has at least 1 adjective, 1 adverb, 1 noun, and 1 verb.

    2. `POST /rank`, it checks for score in request body and responds with the rank percentage relative to other ranks.

2.  ### Frontend (React)

    When the server starts a browser tab should open on (http://localhost:3000)[http://localhost:3000].

    Start categorizing the words by clicking on the answers.  
    feedback will be shown on weither the answer was true or false.  
    when you finish the 10 words you will see a finishing screen that contains all the result (score, rank, time taken).

    #### Screens

    1. **Practice Screen:** This screen has 4 choices and displays 1 word a time, tou should complete a total of 10 words to proceed.

    2. **Rank Screen:** This screen is just a modal that displays the result of answering the 10 words questions.

    3. **History Screen:** This screen displays all the previous scores that was achieved by this user.

## Testing

You can run the tests on both servers using `npm run test` in the root directory as shown in the next section.

### Backend

backend testing is using `jest` and `supertest`.  
The tests can be found in `./server/test.js` in there you can find 5 tests:

1. GET /word should return 10 words
2. GET /word should return at least 1 of each part of speech
3. Rank Endpoint scores: 90, 60, 50

### Frontend

frontend testing is using `jest` and `@testing-library`.  
The tests can be found in `./client/src/App.test.js` in there you can find 2 tests:

1. The words counter updates
2. display error message if api is down

## Available Scripts

In the project directory, you can run:

### `npm install`

installs the required package for this project.

### `npm run setup`

installs all the required packages for server and client.

### `npm run dev`

Runs the app in the development mode.

### `npm run test`

Runs the tests for backend and frontend.
