# Blog API
This is an express application that serves as a backend to two standalone react Frontend applications: <br />
Blog API - Public & Blog API - Private

![Login](https://github.com/user-attachments/assets/22110321-4294-4b20-944d-c81a01a7f93b)

## About

Project Idea: https://www.theodinproject.com/lessons/node-path-nodejs-blog-api <br />

This express application accepts GET & POST requests from it's frontend counterparts, processes them by interacting with a MongoDB database and responds with an appropriate JSON response and status code.

## Features

This project is equipped with the following utilities/features:  <br />
- Express Routing
- RESTFUL API Paradigm
- MVC Architecture where "View" is handled by 2 standalone react applications
- MongoDB CRUD Operations
- Express Validator for field sanitation before DB interactions
- Express Async Handler to minimize catch block redundancies
- RSA Public-Private Key Generation Utility
- JSON Web Token Generator | Algorithm: RS256
- Passport JWT Strategy
- Moment.js to handle JWT expiration time parsing operations
- Bcrypt implementation
- Restricted CORS Policy
  - https://blogpublic.netlify.app
  - https://blogprivate.netlify.app

## Usage
..

## Blog API - Public

Application URL: https://blogpublic.netlify.app/ <br />
GitHub Repository: https://github.com/Mitadru47/TOP-Blog-API-Public <br />

## Blog API - Private

Application URL: https://blogprivate.netlify.app/ <br />
GitHub Repository: https://github.com/Mitadru47/TOP-Blog-API-Private <br />
