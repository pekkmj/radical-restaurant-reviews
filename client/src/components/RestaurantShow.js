import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import ReviewList from "./ReviewList.js"

const RestaurantShow = (props) => {
  const emptyRestaurant = {
    reviews: []
  }
  const [restaurant, setRestaurant] = useState(emptyRestaurant);
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const getRestaurant = async () => {
    const { id } = props.match.params

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

  const handleButtonClick = () => {
    setShouldRedirect(true)
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  return (
    <div>
      <Link to="/restaurants" className="button">Back to restaurants</Link>
      <h3>{restaurant.name}</h3>
      <p>{restaurant.address}, {restaurant.city}, {restaurant.state}, {restaurant.zipCode}</p>
      <p>{restaurant.description}</p>
      <ReviewList reviews={restaurant.reviews} />
    </div>
  )
}

export default RestaurantShow