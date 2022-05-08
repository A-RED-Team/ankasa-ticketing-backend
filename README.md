<div id="top"></div>
<p align="center">
  <a href="https://github.com/altrawan/ankasa-ticketing-backend">
    <img src="https://github.com/altrawan/ankasa-ticketing-frontend/raw/master/screenshoots/logo.png"  width="200px" alt="Logo">
  </a>
</p>
<h3 align="center">Ankasa Flight Booking API</h3>
<p align="center">
  A Web Service and Backend APIs for Ankasa Web Application.
  <br/>
  <a href="#table-of-contents">
    <strong>Explore the docs »</strong>
  </a>
  <br /><br/>
  <a href="https://ankasa-ticketing.herokuapp.com">View Web App</a>
  ·
  <a href="https://github.com/altrawan/ankasa-ticketing-backend/issues">Report Bug</a>
  ·
  <a href="https://github.com/altrawan/ankasa-ticketing-backend">Request Feature</a>
</p>
<p align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/Express-v4.18-green?style=flat">
  </a>                                  
</p>

## API Documentation

### Auth Endpoint

| No  | HTTP Method | URL                             | Operation                           |
| --- | ----------- | ------------------------------- | ----------------------------------- |
| 1   | GET         | /api/auth/verify-email          | Verify email user                   |
| 2   | POST        | /api/auth/register              | Register new user                   |
| 3   | POST        | /api/auth/login                 | Login user                          |

### User Endpoint

| No  | HTTP Method | URL                             | Operation                                      |
| --- | ----------- | ------------------------------- | -----------------------------------------------|
| 1   | GET         | /api/users                      | Get all users (admin)                          |
| 2   | GET         | /api/users/:id                  | Get detail user                                |
| 3   | PUT         | /api/users/update/profile       | Update profile (user)                          |
| 4   | PUT         | /api/users/update/photo         | Update photo (user)                            |
| 5   | PUT         | /api/users/status/:id           | Change status user active or non active (admin)|
| 6   | PUT         | /api/users/level/:id            | Change user to admin or customer (admin)       |

###  Endpoint

| No  | HTTP Method | URL                             | Operation                                      |
| --- | ----------- | ------------------------------- | -----------------------------------------------|
| 1   | GET         | /api/users                      | Get all users (admin)                          |
| 2   | GET         | /api/users/:id                  | Get detail user                                |
| 3   | PUT         | /api/users/update/profile       | Update profile (user)                          |
| 4   | PUT         | /api/users/update/photo         | Update photo (user)                            |
| 5   | PUT         | /api/users/status/:id           | Change status user active or non active (admin)|
| 6   | PUT         | /api/users/level/:id            | Change user to admin or customer (admin)       |


























