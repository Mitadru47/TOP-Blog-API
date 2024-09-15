# Blog API
This is an express application hosted via [render](https://render.com/) that serves as a backend to two standalone react frontend applications: <br />
`Blog API - Public` and `Blog API - Private`.

![Login](https://github.com/user-attachments/assets/22110321-4294-4b20-944d-c81a01a7f93b)

## About

Project Idea: https://www.theodinproject.com/lessons/node-path-nodejs-blog-api <br />

This express application accepts `GET` and `POST` requests from it's frontend counterparts, processes them by interacting with a MongoDB database and responds with an appropriate JSON response and status code.

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

## Usage
`Blog API - Private` Routes are protected by Author Credentials through Passport JWT Authentication Strategy. `Blog API - Public` Routes on the other hand are open and can be used freely. Below is a sample API request. <br /><br />
Request:
```
https://blog-api-b5qs.onrender.com/index
```
Response:
```
{"author":[{"_id":"66dea133f9076625b2797bc4","firstName":"Dutch","lastName":"van der Linde","email":"messiah@vanderlinde.gang","username":"KingLear","password":"$2a$10$es3HVj7ROosPnTYlP7b/Des4dnDBY3fcKtYIevM8mPW6tD7OsCq.i","__v":0,"url":"/user","id":"66dea133f9076625b2797bc4"}],"posts":[{"_id":"66dea133f9076625b2797bcc","title":"The Fool","body":"Vengeance Is An Idiot’s Game","timestamp":"2024-09-14T17:10:39.763Z","createdTimestamp":"2024-09-09T07:18:11.555Z","author":"66dea133f9076625b2797bc4","publishStatus":true,"__v":0,"url":"/post/66dea133f9076625b2797bcc","formattedTimestamp":"2024-09-14","formattedCreatedTimestamp":"2024-09-09","id":"66dea133f9076625b2797bcc"},{"_id":"66dea133f9076625b2797bc8","title":"The Doubts","body":"I Will Keep Trying, And You will Keep Doubting Me, And We will Keep Failing","timestamp":"2024-09-14T09:49:22.492Z","createdTimestamp":"2024-09-09T07:18:11.554Z","author":"66dea133f9076625b2797bc4","publishStatus":true,"__v":0,"url":"/post/66dea133f9076625b2797bc8","formattedTimestamp":"2024-09-14","formattedCreatedTimestamp":"2024-09-09","id":"66dea133f9076625b2797bc8"},{"_id":"66dea133f9076625b2797bcb","title":"The Duality","body":"Just Do One Thing Or The Other, Don’t Try To Be Two People At Once…","timestamp":"2024-09-09T07:18:11.554Z","createdTimestamp":"2024-09-09T07:18:11.554Z","author":"66dea133f9076625b2797bc4","publishStatus":true,"__v":0,"url":"/post/66dea133f9076625b2797bcb","formattedTimestamp":"2024-09-09","formattedCreatedTimestamp":"2024-09-09","id":"66dea133f9076625b2797bcb"},{"_id":"66dea133f9076625b2797bc9","title":"The Survivors Of Guarma","body":"I Am Just Trying To Make Sure Some Of Us Survive","timestamp":"2024-09-09T07:18:11.554Z","createdTimestamp":"2024-09-09T07:18:11.554Z","author":"66dea133f9076625b2797bc4","publishStatus":true,"__v":0,"url":"/post/66dea133f9076625b2797bc9","formattedTimestamp":"2024-09-09","formattedCreatedTimestamp":"2024-09-09","id":"66dea133f9076625b2797bc9"},{"_id":"66dea133f9076625b2797bca","title":"The Consequences","body":"You can’t live a bad life and have good things happen to you","timestamp":"2024-09-09T07:18:11.554Z","createdTimestamp":"2024-09-09T07:18:11.554Z","author":"66dea133f9076625b2797bc4","publishStatus":true,"__v":0,"url":"/post/66dea133f9076625b2797bca","formattedTimestamp":"2024-09-09","formattedCreatedTimestamp":"2024-09-09","id":"66dea133f9076625b2797bca"},{"_id":"66dea133f9076625b2797bc6","title":"The Epilogue","body":"I Aint Got Too Much To Say No More","timestamp":"2024-09-09T07:18:11.552Z","createdTimestamp":"2024-09-09T07:18:11.552Z","author":"66dea133f9076625b2797bc4","publishStatus":true,"__v":0,"url":"/post/66dea133f9076625b2797bc6","formattedTimestamp":"2024-09-09","formattedCreatedTimestamp":"2024-09-09","id":"66dea133f9076625b2797bc6"}]}
```
Refer `routes/Index.js` for additional route documentation.

## Blog API - Public
For additional information regarding `Blog API - Public`, use the following links:

Application URL: https://blogpublic.netlify.app/ <br />
GitHub Repository: https://github.com/Mitadru47/TOP-Blog-API-Public <br />

## Blog API - Private
For additional information regarding `Blog API - Private`, use the following links:

Application URL: https://blogprivate.netlify.app/ <br />
GitHub Repository: https://github.com/Mitadru47/TOP-Blog-API-Private <br />
