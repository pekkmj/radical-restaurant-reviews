import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import ReviewList from "./ReviewList.js"
import NewReviewForm from "./NewReviewForm.js"
import RestaurantTile from "./RestaurantTile.js"

import ErrorList from "./layout/ErrorList.js";
import translateServerErrors from "../services/translateServerErrors.js";

const RestaurantShow = ({ currentUser, ...props }) => {
  const [restaurant, setRestaurant] = useState({ reviews: [] })
  const [reviewListOrForm, setReviewListOrForm] = useState("list")
  const [errors, setErrors] = useState({})
  const { id } = props.match.params

  const getRestaurant = async () => {
    try {
      const response = await fetch(`/api/v1/restaurants/${id}`)
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
        setErrors({})
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
  }, [])

  let reviewListOrFormComponent
  let reviewListOrFormMessage
  switch (reviewListOrForm) {
    case "list":
      reviewListOrFormComponent = <ReviewList 
        reviews={restaurant.reviews}
        currentUser={currentUser}
        restaurant={restaurant}
        setRestaurant={setRestaurant}
      />
      reviewListOrFormMessage = "Add a review"
      break
    case "form":
      reviewListOrFormComponent = <NewReviewForm
        restaurantId={id}
        currentUser={currentUser}
        addNewReview={addNewReview}
      />
      reviewListOrFormMessage = "Back to reviews"
      break
  }

  return (
    <div>
      <Link to="/restaurants" className="button">Back to restaurants</Link>
      <div class="grid-container">
        <div class="grid-x grid-margin-x page">
          <div class="callout cell tiles">
            <RestaurantTile restaurant={restaurant} />
          </div>
          <div class="callout cell tiles">
            <ErrorList errors={errors} />
            <button className="button" onClick={switchListOrForm}>{reviewListOrFormMessage}</button>
            {reviewListOrFormComponent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantShow