import React, { useState, useEffect } from "react"
import RestaurantTile from "./RestaurantTile"
import { Link } from "react-router-dom"

const HomePage = (props) => {
    const [restaurants, setRestaurants] = useState([])

    const getTopThreeRestaurants = async () => {
        try {
            const response = await fetch("/api/v1/restaurants/top-three")
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
        getTopThreeRestaurants()
    }, [])

    const showTopThree = restaurants.map((restaurant) => {
        return (
            <RestaurantTile
                key={restaurant.id}
                restaurant={restaurant}
            />
        )
    })

    return (
        <div class="page grid-container">
            <div class="grid-container">
                <div class="headerText">
                    <h2 class="page header" align="center">Welcome to the most Radical Review Roadblock</h2>

                    <p align="center" class="text">Hey there fellow x-gamer! Have you ever been to a restaurant and thought to yourself "woah this is totatally not tubular!" Well we share your pain. We want to bring to you a place where you can totally check out the best places and put the not so great restaurants in their place!</p>
                </div>
            </div>

            <div class="grid-container topThree">
                <div>
                    <h3 class="page header" align="center">These restaurants rock</h3>
                    <ul class="grid-x grid-margin-x page">{showTopThree}</ul>
                </div>
            </div>

            <div align="center">
                <Link to="/restaurants">See All Restaurants!</Link>
            </div>

        </div>
    )
}

export default HomePage