# Exercise 2 - List movies

In this exercise you will create an API to list movie data as JSON. Next you will learn how to fetch JSON data from the server into the browser and display the data in the developer tools console.

You will learn to:

- Create an serverside API endpoint that returns JSON data describing movies
- Output the data to the console in the frontend

## 2.1 Creating an API endpoint for getting all movies

:book: Before we start coding we need to plan out the data model for movies.

:book: We want the API to describe the following movie details:

- **Title** ("The Godfather")
- **Release date** ("1927-03-14")
- **Overview** ("Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.")
- **Vote average** (from 0.0 to 10.0, eg. 8.7)
- **Vote count** (number of votes)
- **Movie poster** (image)

:book: In web API semantics we call different kinds of data _resources_. _Movie_ is a resource our API will expoose.

:book: We use URLs to organize different resources in the API. We use _HTTP metods_ like `GET`, `POST`, `DELETE` and `PUT` combined with the URL to describe different API operations:

- _Get all_ movies: `GET http://localhost:3000/movie/`
- _Get single_ movie: `GET http://localhost:3000/movie/{id}/` (where `{id}` can be `1`, for instance)
- _Insert_ a movie: `POST http://localhost:3000/movie/` (The movie data we will insert is in the request's _body_)
- _Delete_ a movie: `DELETE http://localhost:3000/movie/{id}/`
- _Update_ a movie: `PUT http://localhost:3000/movie/{id}/` (The movie data we will insert is in the request's _body_)

:book: In this exercise we are going to concentrate on implementing the first API operation, _get all_ movies.

## 2.1.1 JSON data model for movies

:book: [JavaScript Object Notation (JSON)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).

:book: A JSON representation of a single movie can look something like this:

```json
{
  "id": 1,
  "releaseDate": "1972-03-14",
  "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
  "title": "The Godfather",
  "voteAverage": 8.7,
  "voteCount": 12345,
  "posterUrl": "/posters/1.jpg"
}
```

In JavaScript code a movie would look like:

```JavaScript
let movie = {
  id: 1,
  releaseDate: "1972-03-14",
  overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
  title: "The Godfather",
  voteAverage: 8.7,
  voteCount: 534533,
  posterUrl: "/posters/1.jpg"
}
```

:book: Very similar to JSON as you can see.

:book: A list of movies will look something like this in JSON:

```json
{
  "movies": [
    {
      "id": 1,
      "releaseDate": "1972-03-14",
      "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      "title": "The Godfather",
      "voteAverage": 8.7,
      "voteCount": 12345,
      "posterUrl": "/posters/1.jpg"
    },
    {
      "id": 2,
      "releaseDate": "1994-09-23",
      "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
      "title": "The Shawshank Redemption",
      "voteAverage": 8.6,
      "voteCount": 534533,
      "posterUrl": "/posters/2.jpg"
    }
  ]
}
```

:book: We now know what the data model we want to implement looks like. Let's code!

### 2.1.2 Creating an API route

:book: In order to map URLs in our API (eg. `/movie`) to a piece of code we need to define a _route_. A _route_ in Express consists of a method (`GET`, `POST`, etc.) and a URL (eg. `/movie`) and a function that handles a request and a response parameter.

:pencil2: Open up `routes.js` inside the `/src/backend` folder.

:bulb: Notice that we already have a route defined:

```javascript
router.get('/helloworld', async (req, res) => {
  const example = {
    message: 'Hello Nerdschool 🎉🎉🎉'
  };

  res.send(example);
});
```

- `router.get` will define a route that responds to `GET` requests
- The first parameter `'/helloworld'` defines what URL the route will respond to
- the arrow function `async (req, res) => {}` handles the HTTP request (`req`) and the HTTP response (`res`).
- `res.send(someObject)` will convert an object to JSON and return it in the HTTP response to the browser.

:pencil2: Create a new route using the example above that responds to `GET` requests on the URL `/movie`.

:pencil2: Use `res.send()` to return some hard-coded movie data:

<details>
  <summary>Show movie data example</summary>

  ```javascript
  const movies = {
    movies: [
      {
        id: 1,
        releaseDate: "1972-03-14",
        overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
        title: "The Godfather",
        voteAverage: 8.7,
        voteCount: 12345,
        posterUrl: "/posters/1.jpg"
      },
      {
        id: 2,
        releaseDate: "1994-09-23",
        overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
        title: "The Shawshank Redemption",
        voteAverage: 8.6,
        voteCount: 534533,
        posterUrl: "/posters/2.jpg"
      }
    ]
  };
  ```

</details>


### 2.1.3 Get data from the API into the browser

:book: In order to verify that our new API operation is working, we need make some changes the frontend code located inside the `src/frontend` folder.

:pencil2: Open up `main.js`. This file is the main entrypoint for the JavaScript code that runs in the browser.

:bulb: Notice that `main.js` has some code in it already that uses the [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) browser api to retreive data from the server:

```javascript
const helloWorldApiResponse = await fetch('/helloworld');
const helloWorldData = await helloWorldApiResponse.json();
```

:pencil2: Change this code to instead fetch data from our new API endpoint `/movie`. Display the output in the browser dev tools console using `console.log()`.

:exclamation: **Make sure to also remove the following code below, or the code will throw an error:**

```diff
- const body = document.querySelector("body");
- var paragraph = document.createElement('p');
- paragraph.innerText = `Message from API: '${message}'`;
- body.appendChild(paragraph);
```

:pencil2: To view the output, open Chrome Dev Tools and click the _Console_ tab.

:bulb: New to Chrome Dev Tools? See official Chrome docs [Open Chrome Dev Tools](https://developer.chrome.com/docs/devtools/open/) and [Console overview](https://developer.chrome.com/docs/devtools/console/) to learn more. [Inspect network activity](https://developer.chrome.com/docs/devtools/network/) is very useful as well.

:pencil2: You should now see the data you returned from the backend displayed in the console.

#### Refactoring the fetch code

:book: In order to structure the code a bit better, we want to move the fetch-related frontend code into a separate module.

:pencil2: Create a new file called `api.js` inside the `/frontend` folder.

:pencil2: Add the following code to `api.js`:

```javascript
export const getMoviesFromApi = async () => {
  // Fetch code here
}
```

:pencil2: Add the fetch-related code from `main.js` to the function. Make sure to return the movie data from the function.

:pencil2: In `main.js`, import the function at the top:

```javascript
import { getMoviesFromApi } from "./api.js";
```

:pencil2: Call the `getMoviesFromApi` method and assign the result to a variable called `getMoviesFromApiResult`.

:exclamation: Remember that the get movies API response has the following format:

```javascript
{
  movies: [ // array of movies ]
}
```

:pencil2: Use destructuring (see `cheatsheet.js`) or dot notation (`getMoviesFromApiResult.movies`) to create a new variable called `movies` containing the array of movies from the `getMoviesFromApiResult` object. Use `console.log` to log the output to verify the data is correct.

## 2.2 Replacing example movie data with real data

Now that we have succefully returned some data from the serverside API to the browser, we want to make it a bit more realistic.

:pencil2: Open up `movies.json` inside the `src/backend/data` folder.

:book: This is file contains a list of movies from [themoviedb.org](https://www.themoviedb.org/) using the data model we defined above.

:book: We want our application to read this data from disk and return it via the list movies API operation we have created.

:pencil2: Create a new JavaScript module by creating a new file called `database.js` inside `src/backend/data` with the following contents:

```javascript
import fs from "fs/promises";

const dataFilePath = "./backend/data/movies.json";

export const getMovies = async () => {
  const file = await fs.readFile(dataFilePath);
  return JSON.parse(file);
}
```

- `export` means "expose this function outside the module"
- `getMovies` is assigned to a function that returns the contents of `movies.json`
- Data is read from disk using the Node.js API `fs.readFile`
- The JSON data is converted to an JavaScript object using `JSON.parse` and returned

:pencil2: Open `routes.js` and insert the following code at the top of the file to import the `getMovies` function we created from the `database.js` module:

```javascript
import { getMovies } from "./data/database.js";
```

:pencil2: Replace your example data returned from the `/movie` API endpoint:

```javascript
router.get('/movie', async (req, res) => {
  const movies = getMovies();
  res.send(movies);
});
```

:pencil2: Open up the console in Chrome and verify that the new movie data is being logged.

:exclamation: Note: In a "real" application we would use a proper database instead of files on disk, for instance [PostgreSQL](https://www.postgresql.org/) or [MongoDB](https://www.mongodb.com/).

We have a working movie API! Now we need to do something interesting with it.

### [Go to exercise 3 :arrow_right:](../exercise-3/README.md)
