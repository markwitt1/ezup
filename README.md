# Description

A simple, extremely easy to use file sharing system.
You can upload files to the server using dropzone.js. You will get a unique code from a postgres database. By entering this code, you can download your files as zip and the entry will automatically get deleted.

# Database Setup

Install PostgreSQL (https://www.postgresql.org/download/)

Setup a user and a Database

setup the database table by running psql -U \<username\> -f seed.sql

Create a file called ".env" and input your Postgres Connection Data. For reference, use ".env_example" and https://node-postgres.com/features/connecting

# Installation

to run this project, you have to install node.js (http://nodejs.org)
navigate to project directory and run

```
npm install
```

This will install all the required dependencies.
To run the server locally, run

```
npm start
```

This will start a server on port 3000.
To access it, just type http://localhost:3000 into your browser's address field.
