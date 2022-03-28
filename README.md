# Cafe-Employee

## Introduction
This repository contains a full stack node/express react application to manage employees of cafes.
Front End components can be found inside `client` directory and Back End implmentations included inside the `src` directory

## Project setup
```
# cole the respository
git clone git@github.com:vsaran93/Cafe-Employee.git

# install dependencies
cd Cafe-Employee
npm install 

# install front-end dependencies 
cd Cafe-Employee/client
yarn install 
``` 
## Environment variables
inside the src directory create .env file for back-end enviroment specific configuration using .env.sample file and replace the values.
and create .env.development file inside the client directory using .env.development.sample file for front-end enviroment configurations.

## Migrations
```
after done above steps, use below commands to run the database migrations
npx sequelize-cli db:migrate
```

## Available scripts 
In the project directory, you can run:

- to run the server
## `npm run server`

- to run the client 
## `npm run client`

- to run both 
## `npm run dev`

