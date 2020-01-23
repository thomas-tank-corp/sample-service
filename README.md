# Demo product backend

## Overview

This is a simple Node.js backend app that creates and stores hypothetical product listings. Together with [product-fe](https://github.com/walhall-tutorials/product-fe), its purpose is to demonstrate how to deploy a simple app on the [Humanitec internal developer platform](https://humanitec.com).

The app exposes an API on `/products` that allows you to create and list product items. Products are stored in a single table in a Postgres database.

This backend is **pre-configured** to work with Walhall. All you have to do is fork it into your **organization account,** add it to your Walhall app, and click **Deploy.** No changes to the code are necessary.

![Diagram: Architecture of the Humanitec demo app](docs/architecture.png)

## Configuration

You can configure the app's database connection using these environmental variables:

| Variable | Description |
|--|--|
| `DATABASE_HOST` | The DNS name or IP of the database server. |
| `DATABASE_NAME` | The name of the database to connect to. |
| `DATABASE_USER` | Username of ROLE with access to database defined in `DATABASE_NAME` |
| `DATABASE_PASSWORD` | Password for `DATABASE_USER` |
| `DATABASE_PORT` | (Optional) Port on the server defined by `DATABASE_HOST`. Defaults to `5432` |

## Running with docker-compose

The whole system can be run locally using `docker-compose`. This will run the `product-be` server and expose it on `localhost:8080`
and initialize a Postgres database which can be accessed on `localhost:5432`. The admin password to the database is
`pgsqlDev01`.

Run the following commands in the root of the repository:

```
$ docker-compose build
$ docker-compose up
```

## Running locally

When running locally, you must have a Postgres server up and running with a database created and with a Postgres ROLE that has `LOGIN` rights.

After that, the server can be run with the following command:

```
$ DATABASE_HOST="localhost" \
  DATABASE_NAME="product" \
  DATABASE_USER="product_robot" \
  DATABASE_PASSWORD="pr0dr0b0t" \
  node bin/www
```

Now the database server is running on `localhost:5432` with a database called `product` created by a user called `product_robot` with password `pr0dr0b0t`.
