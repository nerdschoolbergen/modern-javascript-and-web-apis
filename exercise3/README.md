# Exercise 3 - Making a REST API for Reviews (for a TV-show)
In this exercise you will create a full REST API to work with reviews (for a TV-show).

> In this exercise you will continue on the work you did in exercise 1 and 2, so no need to creating something new.

You will:

1. Make a endpoint for fetching all reviews
1. Make a endpoint for fetching a review by it's ID
1. Make a endpoint for inserting a new review for a TV-show
1. Make a endpoint for deleting an existing review
1. Make a endpoint for updating an existing review
1. Make a endpoint for fetching all reviews for a TV-show

For this exercise you should follow the same guidelines as discussed in exercise 2.

## 1. Make a endpoint for inserting a new review for a TV-show
Since there are no pre-stored reviews (as there was with TV-shows),
the first thing we need to do to get reviews for a TV-show is to make it possible to create a review.

The resource `Review` should have the following properties:

 * **id**
 * **content** - The content of the review
 * **score** - The review score
 * **relatedItemId** - the ID of the item the review should be related to

Since REST is resource-centric, reviews should be its own resource,
i.e. the base route for reviews should be `/review`.

The service for this functionality should accept `content`, `score` and `relatedItemId`.

## 2. Make a endpoint for fetching all reviews
Now that we are able to create reviews we can start making functionality for retrieving the reviews we have created. For this task you will create a endpoint that gives us all existing reviews.

A review in the response should look something like this:
```
{
  id: "3df1",
  content: "Kinda weird",
  score: 3,
  relatedItemId: "1684"
}
```

## 3. Make a endpoint for fetching a review by it's ID

## 4. Make a endpoint for fetching all reviews for a TV-show

## 5. Make a endpoint for updating an existing review

## 6. Make a endpoint for deleting an existing review
