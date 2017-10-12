# Exercise 3 - Making a REST API for Reviews (for a TV-show)
In this exercise you will create a full REST API to work with reviews (for a TV-show).

:exclamation: In this exercise you will continue on the work you did in exercise 1 and 2, so no need to creating something new.

You will learn to:

- Make an endpoint for fetching all reviews
- Make an endpoint for fetching a review by it's ID
- Make an endpoint for inserting a new review for a TV-show
- Make an endpoint for deleting an existing review
- Make an endpoint for updating an existing review
- Make an endpoint for fetching all reviews for a TV-show

For this exercise you should follow the same guidelines as discussed in exercise 2. Most of the endpoints you'll implement is very similar to what you did in exercise 2.

## 3.1 Make a endpoint for inserting a new review for a TV-show
:pencil2: Since there are no pre-stored reviews (as there was with TV-shows),
the first thing we need to do to get reviews for a TV-show is to make it possible to create a review.

The resource `Review` should have the following properties:

 * **id**
 * **content** - The content of the review
 * **score** - The review score
 * **relatedItemId** - the ID of the item the review should be related to (in this case, the TV-show ID it's related to).

Since REST is resource-centric, reviews should be its own resource,
i.e. the base route for reviews should be `/review`.

The service for this functionality should accept `content`, `score` and `relatedItemId`.

The response should reflect that the item has been created, i.e. the response status should be 201

## 3.2 Make a endpoint for fetching all reviews
:pencil2: Now that we are able to create reviews we can start making functionality for retrieving the reviews we have created. For this task you will create an endpoint that gives us all existing reviews.

A review in the response should look something like this:
```
{
  id: "3df1",
  content: "Kinda weird",
  score: 3,
  relatedItemId: "1684"
}
```

## 3.3 Make a endpoint for fetching a review by it's ID
:pencil2: For this task you will create the functionality for fetching a specific review given by its id. The id should be reflected in the route.

## 3.4 Make a endpoint for updating an existing review
What if we change our mind about a review that we previously posted? Then we should be able to change it, and that is what you will solve in this task. 

:pencil2: Implement the functionality that lets you update a specific review given its ID. (It might be worth doing the bonus task in exercise 2 for hints if you're stuck.)

## 3.5 Make a endpoint for deleting an existing review
We should also be able to delete existing reviews. 

:pencil2: Implement this feature. A review should be deleted based on it's ID.

## 3.6 Make a endpoint for fetching all reviews for a TV-show
Now, having a bunch of reviews is very good, but what if we just want to get the reviews for a specific TV-show? Lets solve that problem! First, where should that REST-resource exist ? Should it be available at the `/review` route? What would that look like? `/review/tvShow/:tvShowId`? A better approach is to make those reviews available at the TV-show resource.

:pencil2: Add functionality to the existing TV-show features so that it is possible to get reviews for a specific TV-show (you also need to make changes to some of the review features...). When you are done the TV-show resource should look like this:
```
{
  id: "74aa",
  name: "Black Mirror",
  genre: "Drama",
  reviews: "http://localhost:3000/tvShow/74aa/review"
}
```

Notice the new `reviews` attribute; it is a link, to another resource. This is a very RESTy way of solving this problem. You could argue that we could just include the reviews in this response like this:
```
{
  id: "74aa",
  name: "Black Mirror",
  genre: "Drama",
  reviews: [
    {
      id: "3df1",
      content: "Kinda weird",
      score: 3,
      relatedItemId: "74aa"
    }
  ]
}
```
 but REST is about resources, and the above example is a TV-show resource, not a review resource so the RESTful approach is to provide the url for the related resource and then it's up to the consumer of this REST API to follow the link for more data if they wish.
