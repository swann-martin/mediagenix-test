# Mediagenix test

To view the project :

- install the node modules

```js :
pnpm install
```

- start the fake api server with json-server

```js :
pnpm serve
```

- start the app

```js :
pnpm dev
```

## The objectives :

Use antdesign & react-query tanstack

### Table where we can Read events

    - get data for table from api
    - delete an event
    - sort an event by title, type, date, description => todo
    - filter an event by title, type, date, description => todo

### Form

    - create fields of the form based on a schema fetched from api
    - basic verification on data for required inputs
    -
    - update an event => todo
    - modal for the form => did not manage to actualise table with new react query when form is in antdesign modal so no modal at the moment

### Search

    - create search input to filter table
    - update the table when search with api call => to finish

### Tests

    - add jest

- Display a dropdown to search the events => fetch but no actualisation of data in table at the moment
- Edit an event => todo
- sort events by title, date, type, description => todo
