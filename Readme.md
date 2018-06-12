 # BuyMeThat

An app for managing office purchasing

## Development setup

- Ensure you have [git](https://git-scm.com/) installed and that you have created a public key and added it to your bitbucket account
- Clone the repository by running `git clone git@bitbucket.org:ghyston/buy-me-that.git`
- Install the [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) installed on your machine. You can verify this by running `java -version`
- Install [Node](https://nodejs.org/en/download/current/). You can verify it is working by running `node -v`
- Install [Yarn](https://nodejs.org/en/download/current/). You can verify it is working by running `node -v`
- Download postgres and install it
- Install [IntelliJ IDEA](https://www.jetbrains.com/idea/) and [Datagrip](https://www.jetbrains.com/datagrip/)
- Create the database:
    - Open pgadmin (installed as part of postgres)
    - In the tree view right click on Login/Group Roles and select Create>Login\Group Role using the details `username: buymethatapi, password: housecatwindowcake, privileges>can log in: yes`
    - In the tree view right click on Databases and select Create>New Database with the name `buymethatdb` and under security add the buymethatapi user to the database with all privileges
- Open the project folder in intelliJ
- In a console (I recommend [ConEnu](https://conemu.github.io/))`yarn install` in the `/client` directory
- In the `/client` directory create a file with the name `.env` containing `REACT_APP_API_LOCATION=http://localhost:8080` as the name suggests this tells your front end where the api is when running locally
- Run `gradlew bootJar` in the root directory

### Development
- Run the api by using the `bootRun` gradle task,  then access at [http://localhost:8080](http://localhost:8080) i.e.
```bash
cd ./buy-me-that
gradlew server:bootRun
```
- Run the front end using yarn, this will start a 'watch' task that should update when you make code changes, visible at [http://localhost:3000](http://localhost:3000)
```bash
cd ./buy-me-that/client
yarn start
```

### Migrations

Database migrations are handled via [flyway](https://flywaydb.org/documentation/) and are run automatically on startup.
These can be manually run by calling `./gradlew flywayMigrate`
To completely recreate your database (useful when developing a migration) you can run `./gradlew flywayClean` and then run the migrations again


## Workflow

- Create and/or assign yourself to a ticket on [JIRA](https://ghyston.atlassian.net/projects/BMT/issues/)
- Create a new branch in git with your initials and name that relates to the ticket `git checkout -b MGH-your-descriptive-branch-name`
- Where relevant create tests to cover the functionality you are creating
- Continually create small focused commits and push your branch remotely
- Once you are finished create a pull request in bitbucket
- Get at least one other person to review and approve your code


## Useful links

#### Tools

- [Idea](https://www.jetbrains.com/idea/) A multi-language [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment)
- Chrome dev tools with the [React Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Postman](https://www.getpostman.com/) a HTTP client useful for developing apis

#### API Component

- [Spring boot](https://projects.spring.io/spring-boot/) A vast and mature web framework which provides solutions for almost all web related tasks in Java  
- [Gradle](https://gradle.org/) a [build tool](https://stackoverflow.com/questions/7249871/what-is-a-build-tool) and [package manager](https://en.wikipedia.org/wiki/Package_manager) for building JVM based projects
- [Flyway](https://flywaydb.org/) A tool to run and manage [database migrations](https://en.wikipedia.org/wiki/Schema_migration), integrates with gradle and spring
- [jOOQ](https://www.jooq.org/) is used to [generate code](https://www.jooq.org/doc/3.5/manual/code-generation/) based upon the database schema. This removes the need for a lot of boilerplate code that is traditionally associated with database interactions.
  It also provides a ['fluent api'](https://www.jooq.org/doc/3.2/manual/sql-building/sql-statements/dsl-and-non-dsl/) for creating database queries 
    - The code generation is run as a part of the `flywayMigrate` gradle task but can be run manually run by calling the gradle task using `gradlew generateMainDBJooqSchemaSource`
- [Postgres](https://www.postgresql.org/download/) A free open-source [SQL](https://developer.mozilla.org/en-US/docs/Glossary/SQL) database

#### Client component

- [Typescript](https://www.typescriptlang.org/index.html) A [type system](https://en.wikipedia.org/wiki/Type_system) for [Javascript](https://developer.mozilla.org/bm/docs/Web/JavaScript) designed to reduce bugs and speed up development
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) The way you change the appearance of web pages
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) XML based markup which is rendered by web-browsers
- [Material UI](http://www.material-ui.com/#/components/flat-button) A component kit which will speed up development by provided high quality pre-built UI elements
- [Styled Components](https://www.styled-components.com/) A Javascript library for styling react components
- [React](https://reactjs.org/) A Javascript library for writing user interfaces
- [Yarn](https://yarnpkg.com) A package manager for the [node](https://nodejs.org/) javascript runtime envionment
- [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) A utility for bootstrapping client applications. Handles creating lots of config and boilerplate files. The User guide has a _lot_ of information on all of the frontend technologies and how they are configured  

## Team

- Matt Hawes <matt.hawes@ghyston.com>;
- Lucian Carp<lc16929@my.bristol.ac.uk>
- Tariq Timol <tt16370@my.bristol.ac.uk>
- Jay Lee <wl16179@my.bristol.ac.uk>
- William Palmer <wp15952@my.bristol.ac.uk>
- Max Trenaman <mt16943.2016@my.bristol.ac.uk>
