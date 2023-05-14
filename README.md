# Password Manager App

![App Screenshot](./screenshots/001.png)

- created by: [Pola Eskandar](https://github.com/polaeskandar).
- **Estimated** building time: 5 hours.
- **Estimated** refactoring time: 2 hours.
- **Estimated** optimizing time: 2 hours.
- **Estimated** documenting time: 1 hours.
- **Estimated** adding new features time: 4 hours.

---

> IMPORTANT: Some parts of this code are definitely not efficient, just there for the sake of time... One possible improvement could be using JWT library instead of manually managing auth tokens. Another possible improvement could be using a DMS (Mongodb, MySQL, PostgreSQL...) instead of using filesystem to store data.

---
## Running the project

You set up and view the project in just 3 steps.

1) Run `npm install` to install dependencies for both backend and frontend.
2) Run `npm frontend:start` to run the frontend application.
3) Run `npm backend:start` to run the backend application.

if everything goes alright, you should be able to view the frontend application on this link: `http://localhost:3000/` and the backend can be tested using postman client on this link: `http://localhost:8000/`

---

## Backend endpoints

For more details on how to use these endpoints, please import this file: `Password Manager App.postman_collection.json` into your postman client. This file contains all information about each request. To view the documentation for the requests, right-click on the folder name `Password Manager App` in your postman client and click on `View documentation` - **IMPORTANT: DON'T FORGET TO SET THE REQUIRED ENVIRONMENT VARIABLES IN YOUR POSTMAN CLIENT!**

### Authentication
- `POST /user/login` To log an existing user in.
- `POST /user/register` To register a new user.

### Categories
- `GET /categories/:id` To get all categories for a specific user.
- `POST /categories` To create a new category for a specific user.
- `PATCH /categories/:id` To edit an existing category for a specific user.
- `DELETE /categories/:id` To delete an existing category for a specific user.

### Passwords

- `GET /passwords/:id` To get all passwords for a specific user.
- `POST /passwords` To create a new password for a specific user.
- `PATCH /passwords/:id` To edit an existing password for a specific user.
- `DELETE /passwords/:id` To delete an existing password for a specific user.

---

## Thin layer of authentication in the backend, why?

The backend is pretty simple, just a simple authentication system and CRUD operations for both categories and passwords. Users aren't able to critical operations that might need an authorization system (e.g. deleting another user), so implementing JWT for this project will be an overkill. Instead, I implemented a file-based authentication, in which tokens for authenticated users are stored in a file called `tokens.json`. Authenticated users can carry out actions which only affects their account.
