# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js

To run the tests:

    jest -i

# New Features

## New Search Method for Comapanies

Search Method added to the Companies model.

Company routes GET by handle is updated with search feature.

## Admin Authentication

isAdmin middleware added.

User routes POST, PATCH, and DELETE now require admin permissions.

Company routes POST, PATCH, and DELETE now require admin permissions.

## Jobs

Jobs model added.

Jobs added to get method in Companies model.

Jobs added to get method in Users model.

## Applications

New POST route in Users routes added.

User model updated with new apply method.

## Tests

New Tests were added for each new feature.

Old Tests were updated as necessary for new features.
