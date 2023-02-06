import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import ReviewList from "./ReviewList.js"
import NewReviewForm from "./NewReviewForm.js"
import ErrorList from "./layout/ErrorList.js";

const RestaurantShow = ({ currentUser }) => {
  const emptyRestaurant = {
    reviews: []
  }
  const [restaurant, setRestaurant] = useState(emptyRestaurant)
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

  const switchListOrForm = () => {
    switch (reviewListOrForm) {
      case "list":
        if (currentUser) {
          setReviewListOrForm("form")
        } else {
          setErrors({user: "must be signed in to add a review"})
        }
        break;
      case "form":
        setReviewListOrForm("list")
        break;
    }
  } 

  useEffect(() => {
    getRestaurant()
  }, [])

  let reviewListOrFormComponent
  let reviewListOrFormMessage
  switch (reviewListOrForm) {
    case "list":
      reviewListOrFormComponent = <ReviewList reviews={restaurant.reviews} />
      reviewListOrFormMessage = "Add a review"
      break;
    case "form":
      reviewListOrFormComponent = <NewReviewForm restaurantId={id} currentUser={currentUser} restaurant={restaurant} setRestaurant={setRestaurant} setReviewListOrForm={setReviewListOrForm} />
      reviewListOrFormMessage = "Back to reviews"
      break;
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