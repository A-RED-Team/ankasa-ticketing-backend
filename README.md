<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/A-RED-Team/ankasa-ticketing-backend">
    <img src="https://lh3.googleusercontent.com/d/1j1a09gdu6PaysgD-U4teBGLPuDqN81zA" alt="Logo" width="200px">
  </a>

  <h3 align="center">Ankasa Ticketing : Backend Flight Booking</h3>

  <p align="center">
    Create a Node.js app for building flight booking RESTful APIs using Express.
    <br />
    <a href="#table-of-contents"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ankasa-ticketing-app.herokuapp.com/">View Web Service</a>
    ·
    <a href="https://github.com/A-RED-Team/ankasa-ticketing-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/A-RED-Team/ankasa-ticketing-backend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#rest-api">REST API</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#our-team">Our Team</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Create a Node.js app for building flight booking RESTful APIs using Express.

### Built With

This app was built with some technologies below:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [PostgreSQL](https://www.postgresql.org/)
- and other

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [Node.js](https://nodejs.org/en/download/)

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.getpostman.com/) for testing
- [Database](./blanja.sql)

### Installation

- Clone the Repo

```
git clone https://github.com/A-RED-Team/ankasa-ticketing-backend.git
```

- Go To Folder Repo

```
cd ankasa-ticketing-backend
```

- Install Module

```
npm install
```

- Make a new database and import [ankasa_ticketing.sql](./blanja.sql)
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
- Type ` npm run start` To Start Production

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Create .env file in your root project folder.

```env
# app
# app
APP_NAME = [APP_NAME]
APP_VERSION = [APP_VERSION]
NODE_ENV = [developement / production]
API_URL=
APP_CLIENT=

# database
PG_HOST=
PG_USER=
PG_PASSWORD=
PG_DATABASE=
PG_PORT=

# jwt
JWT_SECRET=rahasia

# gmail
GMAIL_USER=
GMAIL_PASS=
```

<p align="right">(<a href="#top">back to top</a>)</p>

## REST API

You can view my Postman collection [here](https://www.postman.com/warped-shadow-374852/workspace/flight-booking/overview)
</br>
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19659051-06b2ef16-3542-41cc-85b9-1efb3bb1896b?action=collection%2Ffork&collection-url=entityId%3D19659051-06b2ef16-3542-41cc-85b9-1efb3bb1896b%26entityType%3Dcollection%26workspaceId%3Dae28e44f-f39b-4dc3-b3e1-9675d531d1db#?env%5BProduction%5D=W3sia2V5IjoicHJvZCIsInZhbHVlIjoiaHR0cHM6Ly9hbmthc2EtdGlja2V0aW5nLWFwcC5oZXJva3VhcHAuY29tLyIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoiaHR0cHM6Ly9hbmthc2EtdGlja2V0aW5nLWFwcC5oZXJva3VhcHAuY29tLyIsInNlc3Npb25JbmRleCI6MH1d)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project

:rocket: [`Backend Ankasa Ticketing`](https://github.com/A-RED-Team/ankasa-ticketing-backend)

:rocket: [`Frontend Ankasa Ticketing`](https://github.com/A-RED-Team/ankasa-ticketing-frontend)

:rocket: [`Frontend Ankasa Ticketing Admin`](https://github.com/A-RED-Team/ankasa-ticketing-admin)

:rocket: [`Web Service`](https://ankasa-ticketing-app.herokuapp.com/)

:rocket: [`Demo Ankasa Ticketing`](https://bit.ly/ankasa-ticketing-app)

:rocket: [`Demo Ankasa Ticketing Admin`](https://ankasa-ticketing-admin.netlify.app/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Our Team

<center>
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/altrawan">
          <img width="100" src="https://avatars.githubusercontent.com/u/39686865?v=4" alt="Nur Muhammad Alif Putra Setiawan"><br/>
          <sub><b>Nur Muhammad Alif Putra Setiawan</b></sub> <br/>
          <sub>Project Manager | Full Stack Web Developer</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/rifanhidayatulloh">
          <img width="100" src="https://avatars.githubusercontent.com/u/87940197?v=4" alt="Rif'an Hidayatulloh"><br/>
          <sub><b>Rif'an Hidayatulloh</b></sub> <br/>
          <sub>Back End Web Developer</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/edoprayoga1999">
          <img width="100" src="https://avatars.githubusercontent.com/u/101086199?v=4" alt="Edo Prayoga"><br/>
          <sub><b>Edo Prayoga</b></sub> <br/>
          <sub>Front End Web Developer</sub>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/janexmgd">
          <img width="100" src="https://avatars.githubusercontent.com/u/43938494?v=4" alt="Denny Wahyu Prasetyo"><br/>
          <sub><b>Denny Wahyu Prasetyo</b></sub> <br/>
          <sub>Full Stack Web Developer</sub>
        </a>
      </td>
    </tr>
  </table>
</center>

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
