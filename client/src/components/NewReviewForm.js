import React, { useState } from "react";
import { Redirect } from "react-router-dom"

import ratings from "./constants/ratings.js"
import translateServerErrors from "../services/translateServerErrors.js"
import ErrorList from "./layout/ErrorList.js";

const NewReviewForm = ({ restaurantId, currentUser, restaurant, setRestaurant, setReviewListOrForm }) => {
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

    const addedReview = await addNewReview(newReview)
    console.log(addedReview)
    if (addedReview) {
      setRestaurant({ ...restaurant, reviews: [...restaurant.reviews, addedReview] })
      setReviewListOrForm("list")
    }
  }

  const addNewReview = async (formData) => {
    try {
      const response = await fetch('/api/v1/reviews', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ formData })
      })
      if (!response.ok) {
        if (response.status === 422) {
          const errorBody = await response.json()
          const newErrors = translateServerErrors(errorBody.errors)
          return setErrors(newErrors)
        }
        throw new Error(`${response.status} ${response.statusText}`)
      } else {
        const body = await response.json()
        return body.review;
      }
    } catch (error) {
      console.error(`Fetch post error: ${error.name} ${error.message}`)
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
      <h3>Add a review:</h3>
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
          </select>stars
        </label>

        <input type="submit" className="button" />
      </form>
    </>
  )
}

export default NewReviewForm