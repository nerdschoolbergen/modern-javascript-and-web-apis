# Exercise 3 - First user interface

This exercise is focused on creating a nice user interface in order to display the movie data to the user. Since we prepared the serverside part in the last exercise, this exercise will focus on frontend code.

You will learn to:

- Create a list that displays the movie titles
- Create a grid of tiles to display movie data
- Display movie posters in the tiles

## 3.1 A simple list of movie titles

:book: In order to display a list of movie titles, we need some HTML. Bullet lists in HTML looks like this:

```html
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
```

:book: Each `<li>` tag inside a `<ul>` represents a list item.

Visually it should look something like this in the browser:

- List item 1
- List item 2
- List item 3

### 3.1.1 Static vs. dynamic HTML

#### Static HTML

:book: Now we know what HTML we want to use to display the movie titles. But how do we actually insert the markup into the web page?

:pencil2: Open `index.html` and try creating a list like the one above. Place the markup inside the `<body>` tag.

:pencil2: Verify that the bullet list you created works by opening up the web app in Chrome.

:book: We could write a list of movie titles by hand and insert it into `index.html` like we just did, but since `index.html` is a static file the list would not stay updated if the data changes.

:pencil2: Remove the list you just inserted to get ready for the next part.

#### Dynamic HTML

:book: We want the movie list to change dynamically when the backend movie data changes. In order to do this, we need to _render_ the data into HTML dynamically in the frontend.

:book: Here is an overview of the steps required:

1. Frontend JavaScript code uses the `fetch` browser API to get JSON movie data from the backend API
1. Frontend JavaScript code converts JSON movie data to JavaScript objects representing movies
1. Frontend JavaScript code dynamically creates and inserts HTML with movie titles into the page

:book: We solved the first step and second step in the last exercise. The code should look something like this:

```javascript
const getMoviesApiResponse = await fetch('/movie');
const movieData = await getMoviesApiResponse.json();

const { movies } = movieData; // movies contains an array of movie objects
```

:book: Now we need to create some code that renders the data into HTML using the _DOM_ API.

##### What is the DOM?

:book: The Document Object Model (DOM) is the data representation of the structure and content of a document on the web.

:book: The DOM represents an HTML document in browser memory, and we can use the DOM API in the browser to manipulate the document.



:book: Consider the following HTML document:

```html
<html>
  <body>
    <h1>Hello Nerdschool!</h1>
  </body>
</html>
```

:book: In the DOM, this document would be represented as a _tree structure_ of _nodes_, where `<html>` element would be the _root node_ and the `<body>` element would be a _child node_ of `<html>`.

:book: For example, to locate the `<h1>` element in the DOM, we can use the `queryselectorAll` DOM method on the `document` object:

```javascript
const h1 = document.querySelector('h1'); // Returns an DOM Element
console.log(h1.innerText); // innerText is a Element property containing the text of the node: 'Hello Nerdschool!'
```

:book: Common DOM API uses:

- Create new element
- Append element as child of existing element in document
- Remove elements
- Change existing element's contents
- Traverse elements

:bulb: Se [Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) on MDN for more info.

#### Accessing the DOM in our web app

:book: To create a bullet list we need to use the DOM API to:

1. Create a `<ul>` element to contain the movie list
1. Create `<li>` elements containing the movie titles we want to display
1. Append the `<li>` as children of the `<ul>` element

:pencil2: Create a new file called `dom.js` inside the `src/frontend/` foldert and insert the following function:

```javascript
export const createMovieList = (movies) => {
  const moviesList = document.createElement("ul");

  for (const movie of movies) {
    const movieListEntry = document.createElement("li");
    const { title } = movie;
    movieListEntry.innerText = title;
    moviesList.appendChild(movieListEntry);
  }

  return moviesList;
}
```

:book: Let's take a look at what this function does:

- It takes an array of `movies` as a parameter and returns an DOM Element (_renders_ data into HTML)
- It creates a `<ul>` DOM Element using the `createElement` DOM API method
- It iterates over the `movies` array and creates a  `<li>` Element for each movie
- The movie title for each movie is set as the `inneText` property value for each `<li>` Element
- Each `<li>` Element is appended as a child Element of the `<ul>` Element

Relevant API documentation:

- [document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) on MDN
- [Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) on MDN
- [HTMLElement.innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) on MDN

:pencil2: Open `main.js` from the `/src/frontend` folder and add the following code to the top to import `createMovieList` from `dom.js`:

```javascript
import { createMovieList } from "./dom.js";
```

:pencil2: Add the following code after the `getMoviesFromApi` function call:

```javascript
const movieListContainer = document.getElementById("movie-list");
const moviesList = createMovieList(movies);
movieListContainer.appendChild(moviesList);
```

## 3.2 Create a grid of movie tiles

## 3.3 Displaying movie posters

### [Go to exercise 4 :arrow_right:](../exercise-4/README.md)
