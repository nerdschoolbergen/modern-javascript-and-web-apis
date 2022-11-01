# Exercise 4 - Creating movies

In this exercise, you will create a form where the user can supply a information about a new movie and store that movie into our data store. 

You will learn to:
- Create a POST endpoint for storing a movie 
- Create a form and submit the form using javascript

## 4.1 - Creating a new endpoint

:pencil2: In the `routes.js` file, create a new POST route under `/movie`.

Here is a simple example of how to create a POST route to get your started. The request body can be accessed using the `body` property on the `req` (Request) object. For now, it is enough to simply print out the request body to display its content as a new request is routed to this endpoint.
  
```javascript
router.post('/movie', async (req, res) => {
  console.log('Request body is: ', req.body);
});
```

See the Express.js API reference on the [Request object](https://expressjs.com/en/4x/api.html#req) for more documentation.

## 4.2 - Capturing user input

:pencil2: In our frontend code, we want to create a new [HTML form](https://developer.mozilla.org/en-US/docs/Learn/Forms) to capture the users input for adding a new movie.
In our `index.html` file, create a form with two text input fields; one for the movie `title` and one for the movie `overview`.

You should:
- Give the form a unique ID. We will use this ID to retrieve the form values in our javascript code as the user submits the form.
- Give the inputs descriptive name values (e.g. `movie-title` or `title` and `movie-overview` or `overview`) 
- Create descriptive labels for the inputs, correlating them using the `for` attribute for the label and `name` field for the input. 
- Create a submit button which submits the form 

<details>
  <summary>Show suggested solution</summary>

  ```html
    <form id="create-movie-form">
      <div class="input-container">
          <label for="movie-title">Title</label>
          <div class="flex">
              <input type="text" name="movie-title" />
          </div>
      </div>
      <div class="input-container">
          <label for="movie-overview">Overview</label>
          <div class="flex">
              <textarea type="text" name="movie-overview"></textarea>
          </div>
      </div>
      <input type="submit" value="Save" class="btn-submit" />
    </form>
  ```
</details>

We want to override the default html form mechanics for submitting the form, as we want to capture the data of the form and submit the data ourselves as JSON to our web api.

In order to capture the data from the form, we must add an event listener to the form DOM element. 
We have supplied a simple skeleton for this event listener.

```javascript

// We get a reference to the form DOM element
const createMovieForm = document.getElementById('create-movie-form');

// Add an event listener to the submit action, so that we can
// capture its data as it is submitted
createMovieForm.addEventListener('submit', async (e) => {

  // We prevent the default submit action to be executed, since
  // we want to handle the data submitting ourselves.
  e.preventDefault();

  const formData = new FormData(e.target)
  const title = formData.get('movie-title');
  const overview = formData.get('movie-overview');

  // Create a new movie object from the form inputs and submit 
  // it to our web api using fetch

  e.target.reset();
})
```

:pencil2: Create a new method in `api.js` that POSTS a movie to our api, named e.g. `postMovieToApi`.

:book: For more information on how to use the Fetch API to send JSON data to the API, see [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data) on MDN.

:pencil2: After you have completed the frontend code, check that you are able to submit new movies and that they are printed to the console running our web application. 

## 4.3 - Storing the data

:pencil2: Create a new function in `database.js` to store the new movie into our json file. 

:bulb: The psuedo code for this operation might look something like this: 
- Get array of existing movies from json file
- Add new movie to the movies array
- Write the updated array to the file

:bulb: We have added a default image that you can use for new movies that you add to the json file. The URL of the image is `/movie-posters/default.jpg`.

<details>
  <summary>Show suggested solution</summary>

  ```javascript
  export const insertMovie = async (movie) => {
    const movies = await getMovies();
    const id = movies.length;
    const posterUrl = '/movie-posters/default.jpg';

    const updatedMovies = [...movies, {id, posterUrl, ...movie}];
    await fs.writeFile(dataFilePath, JSON.stringify(updatedMovies, null, 2));
  }
  ```
</details>

:pencil2: Import the new function to your `routes.js` file and use the function to store a new movie from the request body. 

:bulb: The correct HTTP status to return after creating a new resource is `HTTP 201 - Created`. 

## 4.4 - Updating the UI 

After we have created a new movie resource, want to update the UI so that it is in sync with the server side state. 

:pencil2: In the API endpoint for creating a movie, return a updated list of movies in the response body. Use this data to repopulate the data in the view. (Hint: You should remove the existing DOM elements before updating the DOM with new elements from the updated movies list)

:star: Optional: Can you update the UI without returning the data from the API? 

### [Go to exercise 5 :arrow_right:](../exercise-5/README.md)
