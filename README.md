# Angular Node Lambda Dynamo CRUD App [ANLD] 
A sample CRUD App with Angular, Node as client and Lambda, Dynamo DB as backend


## Quick start

Make Sure you Machine contains these Prerequisites:

1. Both Node (> 5.10.0 ) and NPM (> 3.8.3 ) are required.
   If not go to [Node & NPM download page](https://nodejs.org/en/download/) and install
2. Make sure Git (> 1.9.0) is installed. If not check check this [Git Download Page](https://git-scm.com/)   `you'd like to use.`

3. Need to create [manifest.yml](#) file on root level like below with required private details for project.

```
---
applicationEnvironment:
  region: ------
  service: ------
  AWS_ACCESS_KEY: ------
  AWS_SECRET_KEY: -------
  APIKey: -------
  deployStage: -----
  path: -----
```


## Installation

* `mkdir /path/to/your/project`

* `cd /path/to/your/project`

* `git clone https://github.com/hari-007/Node-crud-app-with-Lambda-and-Dynamo-Db.git`

* `npm install`

* `npm start`


* Now you can open any Browser and type — `http://localhost:3000` to see your CRUD Application



## Note

* Coming soon


## License

The project is available under the [Free Open License].
