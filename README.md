# Stock prediction WebApp

Here are written the instructions for usage. 
npm install - for dependencies.

## Project Overview

**Stock prediction WebApp** is built using React for the frontend and Node.js for the backend, with MongoDB as the database. The platform supports user authentication, data submission, viewing previous prediction records, and deleting older records.

## Repository Files

### package.json

The **package.json** file in this project manages the project's dependencies, scripts, and configuration.

### Fronted

**Frontend** is built using React, with routes set up for different pages such as the homepage, login, and signup pages. Various React hooks, including useState, useEffect, and custom hooks, are used for state management and side effects. Data validation is handled on the frontend using the Zod library, ensuring that user inputs are properly validated on submission. The CSS styling is managed in index.css.

### Backend

**Backend** is built using Node.js and Express following the MVC (Model-View-Controller) architecture. Models and schemas are defined in the models folder and connected to MongoDB collections for data storage. User Data: Stored in the User collection, which includes email and hashed password. Prediction Data: Stored in the Prediction collection, containing fields such as stock symbol, predicted price, comment, user ID, and creation timestamp. There are two separate route files in the routes folder, each connected to corresponding functions in the controllers folder, where the main  logic is implemented. Data validation is performed also on the backend using the Zod library to ensure proper input handling. Some configuration variables, such as ADMIN_USER_ID, SECRET, MONGO_URI, and PORT, are stored in the .env file and are not pushed to GitHub. Authentication and authorization are handled in the middleware folder.

### Linter

**Linter** - in this project ESlinter and Prettier is used for linting.

### Vezba

**Vezba**  - in this folder are instructions for github commands and usage.

