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

### Endpoints 

#### User Service

|HTTP Method|URL|Description|
|---|---|---|
|`POST`|#/api | Create new Person |
|`PATCH`|#/api/{userID} | Update Person by name ID |
|`GET`|#/api/{userId} | Get Person by name ID |
|`DELETE`|#/api/{userId} | Delete Person by name ID |