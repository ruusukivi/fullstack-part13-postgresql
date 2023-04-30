# Full Stack Open 2023 - Deep Dive Into Modern Web Development

## Part 13 - Using relational databases

Node.js application using Express, Sequelize and PostgreSQL.

### Setting up the application 

Install dependences and run the application.

    npm install 

    npm start

Run commandline version

    npm cli

### Setting up PostgreSQL with Docker

Pull Postgres image from Docker Hub and start a container in port 5432.

    docker pull postgres
    
    docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres

Add database url as an enviroment variable.

    DATABASE_URL='postgres://postgres:mysecretpassword@localhost:5432/postgres'

Access database via console 

    docker exec -it NAME-OF-THE-CONTAINER psql -U postgres postgres

### Exercises

- [Exercise 13.1-13.3](/ruusukivi/fullstack-part13-postgresql/tree/13.1-13.3) -  Project setup and cli.js
- 