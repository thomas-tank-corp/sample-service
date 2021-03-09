# Demo sample backend

## Overview

This is a simple Node.js backend app that creates and stores hypothetical product listings. Together with [sample-app](https://github.com/humanitec-tutorials/sample-app), its purpose is to demonstrate how to deploy a simple app on the [Humanitec internal developer platform](https://humanitec.com).

The app exposes an API on `/products` that allows you to create and list product items. Products are stored in a single table in a Postgres database.

![Diagram: Architecture of the Humanitec demo app](docs/architecture.png)

## Configuration

You can configure the app's database connection using these environmental variables:

| Variable | Description |
|--|--|
| `CONNECTION_STRING` | The connection string for the PostgreSQL database in URL form |

## Running with docker-compose

The whole system can be run locally using `docker-compose`. This will run the `product-be` server and expose it on `localhost:8080`
and initialize a PostgreSQL database which can be accessed on `localhost:5432`. The admin password to the database is
`pgsqlDev01`.

Run the following commands in the root of the repository:

```
$ docker-compose build
$ docker-compose up
```

### Testing

Tests can be run with:
```
$ npm run test
```

## Running locally

When running locally, you must have a PostgreSQL server up and running with a database created and with a PostgreSQL ROLE that has `LOGIN` rights.

After that, the server can be run with the following command:

```
$ CONNECTION_STRING="postgresql://product_robot:pr0dr0b0t@productdb:5432/product" \
  node bin/www
```

Now the database server is running on `localhost:5432` with a database called `product` created by a user called `product_robot` with password `pr0dr0b0t`.
