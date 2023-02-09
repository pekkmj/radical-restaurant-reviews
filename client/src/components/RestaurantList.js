import React, { useEffect, useState } from "react";

import RestaurantTile from "./RestaurantTile";
import NewRestaurantForm from "./NewRestaurantForm.js";
import translateServerErrors from "../services/translateServerErrors.js"

const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([])
  const [errors, setErrors] = useState({})
  
  const getRestaurants = async () => {
    try {
      const response = await fetch("/api/v1/restaurants/all")
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setRestaurants(body.restaurants)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getRestaurants()
  }, [])

  const addRestaurant = async (formData) => {
    try {
      const response = await fetch('/api/v1/restaurants/new', {
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
        const { newRestaurant } = await response.json();
        setRestaurants([...restaurants, newRestaurant])
        setErrors({})
        return true;
      }
    } catch (error) {
      console.error(`Fetch post error: ${error.name} ${error.message}`)
    }
  }

  const restaurantList = restaurants.map((restaurant) => {
    return (
      <RestaurantTile
        key={restaurant.id}
        restaurant={restaurant}
      />
    )
  })

  return (
    <div>
      <h1>Radical Reviews</h1>
      <ul>{restaurantList}</ul>
      <NewRestaurantForm addRestaurant={addRestaurant} errors={errors} />
    </div>
  )
}

export default RestaurantList