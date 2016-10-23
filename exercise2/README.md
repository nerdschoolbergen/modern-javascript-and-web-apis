# Exercise 2 - Making a REST API for TV Shows
In this exercise you will create a full REST API to work with TV Shows.

> In this exercise you will continue on the project you started in exercise 1. No need to create something new.

You will:

1. Make a endpoint for fetching all tv shows
1. Make a endpoint for fetching a tv show by it's ID
1. Make a endpoint for inserting a new tv show
1. Make a endpoint for deleting an existing tv show
1. Make a endpoint for updating an existing tv show

## 0. Discussing a _resource_

When working with REST, we often talk about _resources_. We say we want to _make a REST API for a resource_. What is a resource?
A resource is an entity we make REST operations for. We can have many resources in our application. In this workshop we will use _tv show_ and _review_. In this exercise, our resource is _tv show_.

The urls we use for a REST API reflect our _resources_ along with the correct _http verb_. For example, above we listed a set of operations we will learn in this exercise. The following is how we expect to implement and use our REST API for the tv show resource:

- _Get all_ tv shows: `GET http://localhost:3000/tvshow/`
- _Get single`_ tv show: `GET http://localhost:3000/tvshow/[id]/`
- _Insert_ a tv show: `POST http://localhost:3000/tvshow/` (The tv show data we will insert is in the request's _body_)
- _Delete_ a tv show: `DELETE http://localhost:3000/tvshow/[id]/`
- _Update_ a tv show: `PUT http://localhost:3000/tvshow/[id]/` (The tv show data we will insert is in the request's _body_)

## 0.1 Fancy logging

A helpful tool when developing is to log what's going on during runtime of our application. Since we are working with a web server in a console/terminal environment, let's get it to log all requests there so we can see what's going on.

We're going to use the library [_Morgan_](https://github.com/expressjs/morgan) to do this for us.

* Install Morgan: `npm install morgan --save`
* In `server.js`, _require_ morgan: `const morgan = require('morgan')`.
* In `server.js`, _use_ morgan: `app.use(morgan('dev'))`. "Dev" is a pre-set log configuration which gives short, concise log statements. You can [try out other configurations if you want](https://github.com/expressjs/morgan#api).
* Restart the web server and invoke a few requests using Postman. See in your terminal that it now logs.
* Git commit the changes, push to github.

![morgan logging]("../images/morgan_logging.PNG")

## 1. Make a endpoint for fetching all tv shows

### 1.1 Introducing a Router

It's good practice to separate functionality into smaller modules which has a single and clear responsibility. Let's do this by separating all REST functionality into it's own _tv show router_.

* In `server.js`, add another _require_ statement at the top: `const tvShowRouter = require('./tvShow/tvShowRouter')`. This doesn't exist yet.
* In `server.js` where we set-up our routes, add the new `tvShowRouter` to handle all requests to the `/tvshow` path: `app.use('/tvshow', tvShowRouter)`.

Your `server.js` file should now look something like this:

~~~~javascript
const express = require('express');
const tvShowRouter =  require('./tvShow/tvShow.router');

const app = express();
const APP_PORT = 3000;

// Exercise #1
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

// Exercise #2
app.use('/tvshow', tvShowRouter);

app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});
~~~~

### 1.1 TV Show model

* Create a new folder: `tvShow`
* Create a new file `TvShow.js`. This file should just contain our tv show _model_:

~~~~javascript
class TvShow {
  constructor(id, name, genre) {
    this.id = id;
    this.name = name;
    this.genre = genre;    
  }
}
module.exports = TvShow;
~~~~

> Note the `module.exports = TvShow` line. Remember that a `.js` file is equal to a javascript _module_ and by default, all members in a module is private. So in order to be able to _import_ our TvShow class, we need to export it - to make it public.

### 1.1 TV Show Router

* Make a new file `tvShowRouter.js`.
* Import express: `const express = require('express')`.
* Import the TvShow model class: `const TvShow = require('./TvShow')`. (When we import local _modules_ we use the filename sans the extension: `TvShow.js -> require('TvShow')`. The relative path to the file is also important. Here the file is in the same directory: `./[name of file]`).
* Create a new instance of an express Router: `const tvShowRouter = express.Router()`.
* Create a new array to hold our tv shows: `const tvShows = []`. We're going to split this out into another file later, but let's play around with it abit first.
* Make a couple of dummy tv shows in the array for now: `const tvShows = [new TvShow(1, 'Mr.Robot', 'Drama'), new TvShow(2, 'Black Mirror', 'Drama')]`
* Make a route for _fetching all tv shows_: `GET http://localhost:3000/tvshow/`:
* Remember to _export the router so it's possible to `require()` it from other modules_.
~~~~javascript
tvShowRouter.get('/', (req, res) => {
  res.json(tvShows);
});
~~~~

> What is `(req, res)`? This is the _request_ and _response_ objects. Naming of parameters is irrelevant in JavaScript so these shorter terms are used alot when working with Express.
> What is `res.json(tvShows)`? Here we say that _take my tvShows array, parse it to json, and set it as my response's body aka the response data_.

Start the web server again: `node server.js`

In Postman, select the http verb `GET` and enter http://localhost:3000/tvshow/.

The response should have a status code 200 OK and the body should contain this JSON content:
~~~~json
[
  {
    "id": 1,
    "name": "Mr.Robot",
    "genre": "Drama"
  },
  {
    "id": 2,
    "name": "Black Mirror",
    "genre": "Drama"
  }
]
~~~~

### 1.1 TV Show Service

It's good practice to have as few _responsibilities_ in one class or module as possible. Preferably only 1 responsibility pr class or module. Our `tvShowRouter` currently has 2: Handle routing for our TV Show _resource_, and keeping track of our tv shows in our array.

Let's introduce another level of abstraction - a _tv show service_ which will handle all operations that has to do with managing tv shows. Our router will only deal with the http routing and calling the service as needed.

* In the `tvShow` folder, create a new file `tvShowService.js`.
* In `tvShowService.js`, create a class that has a tvShows array and a `getAll` method that returns the array.

~~~~javascript
class TvShowService {
  constructor() {
    this.tvShows = [];
  }
  // (You didn't copy & paste this, did you?)
  getAll() {
    return this.tvShows;
  }
}
module.exports = TvShowService;
~~~~

> A class in JavaScript has no concept of private members. Everything is public. This means when we do `this.tvShows = []` in the constructor we made the array public to the class, which may be a bad thing if we want to be 100% sure someone is _only_ using our class methods to access the content of the array. If you want a 100% private array, move it outside of the class so it's private to the _module_ and not the class.

* In `tvShowRouter`, _require_ the `tvShowService`.
* Remove the `tvShows` array
* Replace the usage of the array with a call to `tvShowService.getAll()`.
* Test that everything still works with Postman (remember to restart the web server).
* Git commit the changes and push to github

## 2. Making a endpoint to get a tv show by it's ID

In `tvShowRouter`, we need to add a `GET` handler for the route `http://localhost:3000/tvshow/{id}`.

In express, we can define _route placeholders_ which we can then refer to in code!

For example, the `:name` and `:age` parameters below:

~~~~javascript
app.route('/peraon/:name/:age').get((req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  res.send(`Hello ${name}, you are ${age} years old`);
});
~~~~

* In `tvShowRouter`, add a route that has a `:tvShowId` placeholder value to make up the url `http://localhost:3000/tvshow/:tvShowId`.
* In the function that handles the request, extract the `:tvShowId` value and print it to the console: _"Fetching TV Show with id: {tvShowId}"_.
* In the same function, call a function on the service: `tvShowService.getById(id)`.
* Write the result from calling this function to the response.

Next, we need to implement the `getById(id)` function in the service.

* In `tvShowService`, create the `getbyId(id)` function.
* The easiest way to return an item in an array by a property value is using the `find()` method on the array which takes a function as a parameter. It will invoke this function for every item in the array, and if the function returns `true`, it will return that item. Here is the [example from MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find):

~~~~javascript
// ES5 syntax:
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }

// ES6 syntax:
const inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

console.log(inventory.find(fruit => fruit.name === 'cherries')); // { name: 'cherries', quantity: 5 }
~~~~

* Use the example above to implement `tvShowService.getById(id)` to return a tv show that matches the given id.
* Make sure you have a couple of tv shows to test with. Just hard-code a few into the constructor of `tvShowService`.
* Test that calling http://localhost:3000/tvshow/1 returns the tv show with id 1. Test with more tv shows if you can.
* Git commit and push to GitHub.


## 3. Making a endpoint to create a new tv show

In `tvShowRouter`, we need to add a `POST` handler for the route `http://localhost:3000/tvshow/`.

A tv show has 2 properties which we will need to pass in to the API: _name_ and _genre_. We will do this by making a _JSON object_ in the _request body_.

The JSON object in the request body will look like this:

~~~~JSON
{
  "name": "{your cool name}",
  "genre": "{some genre}"
}
~~~~

First we need to add a handler for POST requests to the url.

* In `tvShowRouter`, add a handler for POST to `/`:

~~~~javascript
tvShowRouter.post('/', (req, res) => {

});
~~~~

* [Find a clever way](http://expressjs.com/en/4x/api.html#req) to get the `name` and `genre` from the _request body_.
* In the post handler, call a method on `tvShowService` which can create and insert the new tv show. Make sure this method returns the new tv show: `const newTvShow = tvShowService.createTvShow(name, genre)`.
* Send the new tv show back with the response.

Next, we need to implement the `createTvShow` method on the `tvShowService`.

* In `createTvShow(name, genre)`, make a new instance of the `TvShow` class and give it the name and genre. We will discuss the ID in a moment.
* Add the new tv show to the array of tv shows.
* Return the new tv show.

### Discussing ID's

A common problem at this point is "how do I assign my new tv show a new, 100% unique ID automatically?". We don't want the user to have to keep track of ID's and create new ones. We need to generate something that we can be sure is unique.

* Create a new folder in your project: `utils`
* Copy & paste this snippet in:

~~~~javascript
const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

const createId = () => `${s4()}`;

module.exports = createId;
~~~~

You don't need to worry too much about this, it'll generate some random letters and numbers such as `9d1e` or `ae37` which is most likely unique enough for our small selection of tv shows.

* Back in `tvShowService`, _require_ this new utility function: `const createId = require('../utils/idUtil');`.
* Replace all existing hard-coded ID's with this function:

~~~~javascript
class TvShowService {
  constructor() {
    this.tvShows = [
      new TvShow(createId(), 'Mr.Robot', 'Drama'),
      new TvShow(createId(), 'Black Mirror', 'Drama')
    ];
  }

  getAll() {
    return this.tvShows;
  }
  // Copy & paste is the root of all evil :D
  getById(id) {
    return this.tvShows.find(tvShow => tvShow.id == id);
  }

  createTvShow(name, genre) {
    const id = createId();
    const tvShow = new TvShow(id, name, genre);
    this.tvShows.push(tvShow);
    return tvShow;
  }
}
module.exports = new TvShowService();
~~~~

For clarity, here is my `tvShowRouter` implementation at this point:

~~~~javascript
const express = require('express');
const tvShowService = require('./tvShowService');
const TvShow = require('./TvShow');
const tvShowRouter = express.Router();

tvShowRouter.get('/', (req, res) => {
  res.json(tvShowService.getAll());
});
// No copy & paste today!
tvShowRouter.post('/', (req, res) => {
  const name = req.body.name;
  const genre = req.body.genre;
  const newTvShow = tvShowService.createTvShow(name, genre);
  res.send(newTvShow);
});

tvShowRouter.route('/:tvShowId')
  .get((req, res) => {
    const tvShow = tvShowService.getById(req.params.tvShowId)
    res.send(tvShow);
  });
~~~~

* Restart the web server and test that all endpoints are working:

**GET `http://localhost:3000/tvshow/`**
~~~~json
[
  {
    "id": "e706",
    "name": "Mr.Robot",
    "genre": "Drama"
  },
  {
    "id": "b7c0",
    "name": "Black Mirror",
    "genre": "Drama"
  }
]
~~~~

**GET `http://localhost:3000/tvshow/e706`** (your ID will be different)
~~~~json
{
  "id": "e706",
  "name": "Mr.Robot",
  "genre": "Drama"
}
~~~~

**POST `http://localhost:3000/tvshow/`**

~~~~json
{
  "id": "e706",
  "name": "Mr.Robot",
  "genre": "Drama"
}
~~~~

#### Creating a POST request in Postman

* First, select `POST` as the http verb in the dropdown list next to the url textbox.
* Next, we need to add a http header that tells the server what kind of data it can expect to find in the request. We want to use JSON, so we need to specify that the header `Content-Type` is `application/json`.

![postman post headers]('../images/postman_post_headers.png')

* Finally, we create the body which we mentioned at the start of this task:
~~~~JSON
{
  "name": "The Office",
  "genre": "Comedy"
}
~~~~

![postman post body]('../images/postman_post_body.png')

* Click _Send_ and see that you get the new tv show back.

* Do another GET `http://localhost:3000/tvshow/` to list all tv shows. You should now see the new tv show in the list.

![postman post after]('../images/postman_post_after.png')

### Finishing up

Congratulations on making it this far! Your REST API now actually has real, useful functionality.

Let's finish up like before:

* Git commit everything, push to GitHub.
