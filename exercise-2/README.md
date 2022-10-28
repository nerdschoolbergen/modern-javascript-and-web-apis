# Exercise 2 - List movies

In this exercise you will create an API to list movie data as JSON. Next you will learn how to fetch JSON data from the server into the browser and display the data in the developer tools console.

You will learn to:

- Make an API endpoint that returns JSON data describing movies
- Output the data to the console

## 1.1 Creating an API endpoint for getting all movies

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

For now we are going to concentrate on the first one, _get all_ movies.

### [Go to exercise 3 :arrow_right:](../exercise-3/README.md)