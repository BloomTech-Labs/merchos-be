[![Maintainability](https://api.codeclimate.com/v1/badges/f8a81e8d0405db2b5ad4/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/merchos-be/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/f8a81e8d0405db2b5ad4/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/merchos-be/test_coverage)


# API Documentation

#### Backend delpoyed at [Heroku](https://merchos-be.herokuapp.com/) <br>

## Getting started

To get the server running locally:


1. Clone this repo
2. Enter the downloaded directory
3. Install the dependencies (`yarn install` or `npm install`)
4. Start the development server (`yarn server` or `npm run server`)


### Nodejs/express

- Simplified HTTP server
- Pure Javascript
- NPM access
- Middleware

## Endpoints

#### User Routes

| Method | Endpoint          | Access Control | Description      |
| ------ | ----------------- | -------------- | ---------------- |
| GET    | `/users/register` | all users      | Registers a user |
| GET    | `/users/login`    | all users      | Logs a user in   |

# Data Model

#### ROLES

---

```
{
  id: UUID
  role: STRING
  role_desc: STRING
}
```

#### USERS

---

```
{
  id: UUID
  role_id: UUID foreign key in ROLES table
  username: STRING
  password: STRING
  first_name: STRING
  phone_number: STRING
  account_number: STRING
  routing_number: STRING
  card_number: STRING
  card_exp: STRING
  card_security: STRING
  card_name: STRING
  address_street: STRING
  address_city: STRING
  address_state: STRING
  address_country: STRING
  address_zip: STRING
}
```

#### store

---

```
{
  id: UUID
  name: STRING
  url: STRING
}
```

#### user_store

---

```
{
  id: UUID
  user_id: UUID foreign key in USERS table
  store_id: UUID foreign key in STORE table
}
```

## Actions

`add(user)` -> Adds a user to the database

`addRole(role)` -> Adds a role to the roles table

`findAllRoles()` -> Returns all roles

`findAll()` -> Returns all users

`findBy(filter)` -> Returns a user by certain filter

`findById(id)` -> Returns a user with a specific id

`remove(id)` -> Deletes a user with a specific ID

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:


    PORT - Specify a port for server to run on (default: 5000)
    USER - Username for local Postgres server
    PASSWORD - Password for local Postgres server
    DATABASE - Specify database on Postgres server
    JWT_TOKEN - JWT secret for authentication and authorization


## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/merchos-fe) for details on the fronend of our project.
