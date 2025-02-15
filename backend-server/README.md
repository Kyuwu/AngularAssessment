# Technical brief

In this test we ask you to implement (parts of) the functionalities mentioned below.

The aim of the assignments is not to see what you can't implement; we're interested in what you have been able to implement, but mostly how and why you implemented it that way.

We like to see readable code; for us HTML, CSS and JavaScript are all equally important.

## Getting started

- You need Node.js to run things the way they are built now
- You can install all dependencies with `yarn` or `npm install`
- You can start the front end with `yarn start` or `npm run start`. The web page is subsequently located at [http://localhost:1234](http://localhost:1234).
- With `yarn start-server` or `npm run start-server` you can start the back end. The back end will then be accessible at [http://localhost:8080](http://localhost:8080).
- The pages will reload/update when changes are made.

## Front end

A basic front end can be found in `src`. This is configured with [mustache.js](https://github.com/janl/mustache.js/blob/master/README.md) as a template engine.

When you want to add new pages, you can duplicate the `categories` folder.
Afterward you should rerun the start command.

> You're not required to use this template.
> If you'd rather work with [Angular](https://angular.io) or plain JavaScript/TypeScript, that's allowed.
> We request you don't use any other frameworks.

## Back end

A basic back end can be found in the `server` directory.
This server returns some information about films and categories.
The database schema, including all relative relations, can be found in the `images/database` directory.

The server contains 2 endpoints.

| Path                    | Description                               |
| ----------------------- | ----------------------------------------- |
| `/categories`           | Returns all categories with description   |
| `/categories/:id/films` | Returns all films for a specific category |

After starting the back end you can check the data it returns by fetching (for example) [`http://localhost:8080/categories/1/films`](http://localhost:8080/categories/1/films) in your browser.

> It should not be needed to change the API, but you are allowed to.

## Assignments

In the `images/designs/` directory we have put some designs for a simple application.
Below are a few assignments that you can do to (re)create this application

Your application should be similar to the designs, it doesn't have to be an exact match, however.
Don't worry too much about exact sizes, margins or colours.

1. The first assignment is showing all categories. The back end already has an API endpoint you can use and the design (`Index.png`) shows how you could display them. Please note how the category descriptions are capitalized in the design and make sure you follow that.

2. If you click on a category you should see the films in that category. This could be a separate page as it is out of the box, but we give preference to a one-page solution as illustrated in the design (`Category.png`). You can use the second API endpoint to get the data. Notice the total duration of all films on this page. In this page should be checkboxes for the different PG-ratings that are present in this category.

3. Make a search box, as shown in the design (`Search.png`), and let this filter the list of categories. It would be best if this happens 'live', so while typing. The alternative is to change the list when the user presses <enter>. 

4. In the film overview (`Category.png`) you created the checkboxes in the second assignment. Now we also want these checkboxes to filter our the films. 

5. As a final challenge make sure your entire codebase is explicitly typed, so no any's or missing types. You will need to write your own types for the values that are returned by the API.

### Details

The following colours are used in the designs, and they are available as css custom properties (css variables) from `css/defaults.css`.
Note that it's up to you if you want to use these values; as stated before you don't have to replicate the designs perfectly.

| Property          | Value     |
| ----------------- | --------- |
| Pink              | `#E64980` |
| Background colour | `#F8F9FA` |
| Text colour       | `#212529` |
