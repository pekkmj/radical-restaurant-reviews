import React, { useEffect, useState } from "react";
import RestaurantTile from "./RestaurantTile";

const RestaurantList = () => {

    const [restaurants, setRestaurants] = useState([])

    const getRestaurants = async () => {
        try {
            const response = await fetch("/api/v1/restaurants")
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

    const restaurantList = restaurants.map((restaurant) => {
        return (
            <RestaurantTile
            key={restaurant.id}
            restaurant={restaurant}
            />
        )
    })

    return(
        <div>
            <h1>Radical Reviews</h1>
            <ul>{restaurantList}</ul>
        </div>   
    )
}

export default RestaurantList