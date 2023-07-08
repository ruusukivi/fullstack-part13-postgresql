# Full Stack Open 2023 - Deep Dive Into Modern Web Development

## Part 13 - Using relational databases

Node.js backend application using Express, Sequelize and PostgreSQL.

### Setting up PostgreSQL with Docker

Pull Postgres image from Docker Hub and start a container in port 5432.

    docker pull postgres
    
    docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres

Add database url as an environment variable.

    DATABASE_URL='postgres://postgres:mysecretpassword@localhost:5432/postgres'

Access database via console 

    docker exec -it NAME-OF-THE-CONTAINER psql -U postgres postgres

### Setting up the application 

Install dependences and run the application

    npm install 

    npm start

Run Jest tests for APIs

    npm test

Run commandline version (prints existing blogs from the database)

    npm run cli

### Exercises

- [x] [Exercise 13.1-13.3](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.1-13.3) -  project setup and cli.js
- [x] [Exercise 13.4](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.4) -  index.js supporting GET, POST, DELETE
- [x] [Exercise 13.5](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.5) -  improved structure for the app
- [x] [Exercise 13.6](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.6) -  adding PUT for likes
- [x] [Exercise 13.7](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.7) -  adding error handler
- [x] [Exercise 13.8](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.8) -  adding user management + tests
- [x] [Exercise 13.9](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.9) -  adding validation for username
- [x] [Exercise 13.10](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.10) -  adding login endpoint 


