import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import ReviewList from "./ReviewList.js"
import NewReviewForm from "./NewReviewForm.js"
import ErrorList from "./layout/ErrorList.js";
import translateServerErrors from "../services/translateServerErrors.js";

const RestaurantShow = ({ currentUser, ...props }) => {
  const emptyRestaurant = {
    reviews: [{id: 0, votes: {score: 0, currentUserVote: false}}]
  }
  const [restaurant, setRestaurant] = useState(emptyRestaurant)
  const [reviewListOrForm, setReviewListOrForm] = useState("list")
  const [errors, setErrors] = useState({})
  const { id } = props.match.params

  const getRestaurant = async () => {
    try {
      const response = await fetch(`/api/v1/restaurants/${id}/${currentUser?.id}`)
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setRestaurant(body.restaurant)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
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
        const addedReview = body.review
        setRestaurant({ ...restaurant, reviews: [...restaurant.reviews, addedReview] })
        setReviewListOrForm("list")
        return [true, addedReview];
      }
    } catch (error) {
      console.error(`Fetch post error: ${error.name} ${error.message}`)
    }
  }

  const switchListOrForm = () => {
    switch (reviewListOrForm) {
      case "list":
        if (currentUser) {
          setReviewListOrForm("form")
        } else {
          setErrors({ user: "must be signed in to add a review" })
        }
        break
      case "form":
        setReviewListOrForm("list")
        break
    }
  }

  useEffect(() => {
    getRestaurant()
  }, [currentUser])

  let reviewListOrFormComponent
  let reviewListOrFormMessage
  switch (reviewListOrForm) {
    case "list":
      reviewListOrFormComponent = <ReviewList reviews={restaurant.reviews} currentUser={currentUser} />
      reviewListOrFormMessage = "Add a review"
      break
    case "form":
      reviewListOrFormComponent = <NewReviewForm restaurantId={id} currentUser={currentUser} addNewReview={addNewReview} />
      reviewListOrFormMessage = "Back to reviews"
      break
  }

  return (
    <div>
      <Link to="/restaurants" className="button">Back to restaurants</Link>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.zipCode}</p>
      <p>{restaurant.description}</p>
      <ErrorList errors={errors} />
      <button className="button" onClick={switchListOrForm}>{reviewListOrFormMessage}</button>
      {reviewListOrFormComponent}
    </div>
  )
}

export default RestaurantShow