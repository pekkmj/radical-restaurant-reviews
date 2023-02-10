import React, { useState } from "react";

import ratings from "./constants/ratings.js"
import ErrorList from "./layout/ErrorList.js";

const NewReviewForm = ({ restaurantId, currentUser, addNewReview }) => {
  const emptyNewReview = {
    restaurantId: restaurantId,
    userId: currentUser.id,
    subject: '',
    body: '',
    rating: ''
  }
  const [newReview, setNewReview] = useState(emptyNewReview)
  const [errors, setErrors] = useState({})

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const [reviewAdded, result] = await addNewReview(newReview)
    if (!reviewAdded) {
      setErrors(result)
    }
  }

  const ratingOptions = ratings.map(rating => {
    return (
      <option key={rating} value={rating}>{rating}</option>
    )
  })

  return (
    <>
      <ErrorList errors={errors} />
      <h3 className="page">Add a review:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">
          Subject:
          <input type="text" name="subject" value={newReview.subject} onChange={handleInputChange} />
        </label>

        <label htmlFor="body">
          Body:
          <input type="text" name="body" value={newReview.body} onChange={handleInputChange} />
        </label>

        <label htmlFor="rating">
          Rating:
          <select name="rating" onChange={handleInputChange} value={newReview.rating}>
            {ratingOptions}
          </select>
        </label>

        <input type="submit" className="button" />
      </form>
    </>
  )
}

export default NewReviewForm