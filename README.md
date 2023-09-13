# HNGx Stage Two- Person CRUD API

A Complete Guide on how to use the API.

## Overview

### Project layout

```
|- Stage Two.txt                        // projects instructions
|- README.md                            // projects descripton
|- db/                                  // MongoDb connection script
|- Controllers/                         // Folder containing REST controllers
|- Models/                              // Folder containing Database schema
|- Routes/                              // Folder containing valid
|- package.json                         // App config
|- app.js                               // main app is here
```

---

### Build and Run

#### Using Node.js

##### Pre Requirements

- `node.js`

**Note:** You may run `npm install` script to install required modules.

##### Build Project

#### In localhost
```
$ npm install
$ npm start
```

---
### UML Diagram
![API UML Diagram](https://github.com/ExtranoDev/HNGx-Internship/blob/main/HNGx1.jpg)
### Endpoints 

#### User Service

|HTTP Method|URL|Description|
|---|---|---|
|`POST`|https://extranodev.onrender.com/api | Create new Person |
|`PATCH`|https://extranodev.onrender.com/api/{userID} | Update Person by name ID |
|`GET`|https://extranodev.onrender.com/api/{userId} | Get Person by name ID |
|`DELETE`|https://extranodev.onrender.com/api/{userId} | Delete Person by name ID |


## Create Person

### Request

`POST /api`

   https://extranodev.onrender.com/api

`Body Params Using Postman`
    {
        "name": "foo Cruise"
    }

### Response

    {
        "person": {
            "name": "Foo Cruise",
            "_id": "6501da76db82a4806c49b2ce",
            "__v": 0
        },
        "msg": "User creation successful",
        "status": "Success"
    }

## Get a Person

### Request

`GET /api/user_id`

    https://extranodev.onrender.com/api/foo
    https://extranodev.onrender.com/api/foo-cruise

### Response

    {
        "person": {
            "_id": "65019826a6051e5eeaee6dac",
            "name": "Foo Cruise",
            "__v": 0
        },
        "msg": "Person Foo Cruise Found",
        "status": "Success"
    }

## Update a Person

### Request

`PATCH /api/user_id`

    https://extranodev.onrender.com/api/foo-cruise

`Body Params Using Postman`
    {
        "name": "foo Cruise test"
    }

### Response

    {
        "msg": "Person Foo Cruise updated",
        "newDetails": {
            "_id": "6501da76db82a4806c49b2ce",
            "name": "Foo Cruise Test",
            "__v": 0
        },
        "status": "Success"
    }

## Get a non-existent Person

### Request

`GET /api/dont-exist`

    https://extranodev.onrender.com/api/dont-exist

### Response

    {
        "msg": "No Person with name Dont Exist can be found!!!",
        "status": "Failed"
    }


## Delete a Person

### Request

`DELETE /api/user_id`

    https://extranodev.onrender.com/api/foo-Cruise

### Response

    {
        "msg": "Foo Cruise deleted",
        "status": "Success"
    }
