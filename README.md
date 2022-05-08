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

### PIC  Endpoint

| No  | HTTP Method | URL                             | Operation                                      |
| --- | ----------- | ------------------------------- | -----------------------------------------------|
| 1   | GET         | /api/pic                        | Get all pic (admin)                            |
| 2   | GET         | /api/pic/:id                    | Get detail pic                                 |
| 3   | POST        | /api/pic                        | Add pic (admin)                                |
| 4   | PUT         | /api/pic/:id                    | Update pic (admin)                             |
| 5   | PUT         | /api/pic-status/:id             | Change pic active or non active (admin)        |

### flight Endpoint

| No  | HTTP Method | URL                             | Operation                                      |
| --- | ----------- | ------------------------------- | -----------------------------------------------|
| 1   | GET         | /api/flight                     | Get all flight (admin)                         |
| 2   | GET         | /api/flight/:id                 | Get detail flight                              |
| 3   | GET         | /api/flight-customers           | Get flight latest                              |
| 4   | POST        | /api/flight                     | Create flight (admin)                          |
| 5   | PUT         | /api/flight/:id                 | Update flight (admin)                          |
| 6   | PUT         | /api/flight/mode/:id            | Change flight active or non active (admin)     |
| 7   | DELETE      | /api/flight/:id                 | Delete flight (admin)                          |

### Airlane Endpoint

| No  | HTTP Method | URL                             | Operation                                         |
| --- | ----------- | ------------------------------- | --------------------------------------------------|
| 1   | GET         | /api/airline                    | Get all airline (admin)                           |
| 2   | GET         | /api/airline/:id                | Get detail airline (admin)                        |
| 3   | POST        | /api/airline                    | Create airline (admin)                            |
| 4   | PUT         | /api/airline/:id                | Update airline (admin)                            |
| 5   | PUT         | /api/airline/mode/:id           | Change status airline active or non active (admin)|

### City Endpoint

| No  | HTTP Method | URL                             | Operation                                      |
| --- | ----------- | ------------------------------- | -----------------------------------------------|
| 1   | GET         | /api/city                       | Get all city (admin)                           |
| 2   | GET         | /api/city/public                | Get all city (user)                            |
| 3   | GET         | /api/city/detail/:cityId        | Get detail city                                |
| 4   | POST        | /api/city                       | Create city (admin)                            |
| 5   | PUT         | /api/city/:cityId               | Update city (admin)                            |
| 6   | PUT         | /api/city/status/:cityId        | Change status city active or non active (admin)|

### Country Endpoint

| No  | HTTP Method | URL                             | Operation                                         |
| --- | ----------- | ------------------------------- | --------------------------------------------------|
| 1   | GET         | /api/country                    | Get all country (admin)                           |
| 2   | GET         | /api/country/:countryId         | Get detail country                                |
| 3   | POST        | /api/country                    | Create country (admin)                            |
| 4   | PUT         | /api/country/:countryId         | Update country (admin)                            |
| 5   | PUT         | /api/country/status/:countryId  | Change status country active or non active (admin)|

### Booking Endpoint

| No  | HTTP Method | URL                             | Operation                                      |
| --- | ----------- | ------------------------------- | -----------------------------------------------|
| 1   | GET         | /api/booking                    | Get all booking (admin)                        |
| 2   | GET         | /api/mybooking                  | Get all my booking (user)                      |
| 3   | GET         | /api/booking/:bookingId         | Get detail booking (admin)                     |
| 4   | GET         | /api/bookingbyuser/:bookingId   | Get detail booking (user)                      |
| 5   | POST        | /api/booking                    | Create booking (user)                          |
| 6   | PUT         | /api/booking/payment/:bookingId | Update booking payment (user)                  |
| 7   | PUT         | /api/booking/status/:bookingId  | Change booking active or non active (admin)    |




