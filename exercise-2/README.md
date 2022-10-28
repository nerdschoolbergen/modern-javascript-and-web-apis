# Exercise 2 - List movies

In this exercise you will create an API to list movie data as JSON. Next you will learn how to fetch JSON data from the server into the browser and display the data in the developer tools console.

You will learn to:

- Make an API endpoint that returns JSON data describing movies
- Output the data to the console

## 2.1 Creating an API endpoint for getting all movies

Before we start coding we need to plan out the data model for movies.

We want the API to describe the following movie details:

- Title ("The Godfather")
- Release date ("1927-03-14")
- Overview ("Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.")
- Vote average (from 0.0 to 10.0, eg. 8.7)
- Movie poster (image)

In web API semantics we call different kinds of data _resources_. _Movie_ is a resource our API will expoose.

We use URLs to organize different resources in the API. We use _http metods_ like GET, POST, DELETE and PUT combined with the URL to describe different API operations:

- _Get all_ movies: `GET http://localhost:3000/movie/`
- _Get single_ movie: `GET http://localhost:3000/movie/{id}/`
- _Insert_ a movie: `POST http://localhost:3000/movie/` (The movie data we will insert is in the request's _body_)
- _Delete_ a movie: `DELETE http://localhost:3000/movie/{id}/`
- _Update_ a movie: `PUT http://localhost:3000/movie/{id}/` (The movie data we will insert is in the request's _body_)

In this exercise we are going to concentrate on implementing the first API operation, _get all_ movies.

## 2.1.1 JSON data model for movies

[JavaScript Object Notation (JSON)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).

A JSON representation of a single movie can look something like this:

```json
{
  "id": 1,
  "releaseDate": "1972-03-14",
  "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
  "title": "The Godfather",
  "voteAverage": 8.7,
  "posterUrl": "/posters/1.jpg"
}
```

In JavaScript code a movie would look like:

```JavaScript
let movie = {
  id: 1,
  releaseDate: "1972-03-14",
  overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
  title: "The Godfather",
  voteAverage: 8.7,
  posterUrl: "/posters/1.jpg"
}
```

Very similar to JSON as you can see.

A list of movies will look something like this in JSON:

```json
{
  "movies": [
    {
      "id": 1,
      "title": "The godfather",
      "releaseDate": "1972-03-14",
      "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
      "title": "The Godfather",
      "voteAverage": 8.7,
      "posterUrl": "/posters/1.jpg"
    },
    {
      "id": 2,
      "title": "The Shawshank Redemption",
      "releaseDate": "1994-09-23",
      "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
      "title": "The Godfather",
      "voteAverage": 8.6,
      "posterUrl": "/posters/2.jpg"
    }
  ]
}
```

We now know what the data model we want to implement looks like.

### 2.1.2 Creating a route

In order to map URLS in our API (eg. `/movie`) to a piece of code we need to define a _route_. A _route_ in Express consists of a method (`GET`, `POST`, etc.) and a URL (eg. `/movie`) and a function that handles a request and a response parameter. 

:pencil2: Open up `routes.js` inside the `/src/backend` folder.

Notice that we already have a route defined:

```javascript
router.get('/helloworld', async (req, res) => {
  const example = {
    message: 'Hello Nerdschool 🎉🎉🎉'
  };

  res.send(example);
});
```

- `router.get` will define a route that responds to `GET` requests
- The first parameter '/helloworld' defines what URL the route will respond to
- the `async (req, res) => {}` handles the HTTP request (`req`) and the HTTP response (`res`). 
- `res.send(someObject)` will convert an object to JSON and return it in the HTTP response to the browser.

:pencil2: Create a new route using the example above that responds to `GET` requests on the URL `/movie`.

:pencil2: Use `res.send()` to return some example movie data of your own choice.

### 2.1.3 Get data from the API into the browser

In order to check if our new API operation is working, we need make some changes the frontend code located inside the `src/frontend` folder.

:pencil2: Open up `main.js`. This file is the main entrypoint for the JavaScript code that runs in the browser.

Notice that `main.js` has some code in it already that fetches data from the server:

```javascript
const helloWorldApiResponse = await fetch('/helloworld');
const helloWorldData = await helloWorldApiResponse.json();

const { message } = helloWorldData;
```

:pencil2: Try changing this code to instead fetch data from our new API endpoint `/tvshow`. Display the output in the browser dev tools console using `console.log()`.

:pencil2: To view the output, open Chrome Dev Tools and click the _Console_ tab.

New to Chrome Dev Tools? See [Open Chrome Dev Tools](https://developer.chrome.com/docs/devtools/open/) and [Console overview](https://developer.chrome.com/docs/devtools/console/) to learn more.

:pencil2: You should now see the mock data you returned from the backend displayed in the console.

### [Go to exercise 3 :arrow_right:](../exercise-3/README.md)