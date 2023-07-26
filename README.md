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
- [x] [Exercise 13.11-13.12](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.11) - adding user info to blogs and deletion
- [x] [Exercise 13.13](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.13) -  adding filtering by keyword
- [x] [Exercise 13.14](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.14) -  expanded filtering
- [x] [Exercise 13.15](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.15) -  sorting blogs based on likes in descending order
- [x] [Exercise 13.16](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.16) -  adding  authors endpoint
- [x] [Exercise 13.17](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.17) -  adding migrations
- [x] [Exercise 13.18](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.18) -  adding  year column to blogs
- [x] [Exercise 13.19](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.19) -  adding  reading lists
- [x] [Exercise 13.20](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.20) -  adding  apis for reading lists
- [x] [Exercise 13.21](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.20) -  adding info if the blog is read
- [x] [Exercise 13.21](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.20) -  adding functionality to mark a blog in the reading list as read
- [x] [Exercise 13.22](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.22) -  updating the read status in reading list
- [x] [Exercise 13.23](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.23) -  adding support for read blogs in user endpoint
- [x] [Exercise 13.24](https://github.com/ruusukivi/fullstack-part13-postgresql/tree/13.24) -  adding session handling and refactoring