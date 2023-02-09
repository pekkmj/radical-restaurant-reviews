import React, { useState, useEffect } from "react"
import RestaurantTile from "./RestaurantTile"
import { Link } from "react-router-dom"

const HomePage = (props) => {
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

    const top3Restaurants = () => {
        let allRestaurants = restaurants
        allRestaurants.sort((a, b) => {
            return b.averageRating - a.averageRating
        })

        let top3 = []
        if (allRestaurants.length > 3) {
            for (let i = 0; i < 3; i++) {
                top3.push(allRestaurants[i])
            } 
        } else {
            top3 = allRestaurants
        }

        return top3
    }

    const showTopThree = top3Restaurants().map((restaurant) => {
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

                    <p align="center" class="text">Hey there fellow x-gamer! Have you ever been to restaurant and thought to yourself "man this is totatally not tubular man!" Well we share your pain dude guy man. We want to bring to you a place where you can totally check out the best places and put the poopy buttholes in their place!</p>
                </div>
            </div>

            <div class="grid-container topThree">
                <div>
                    <h3 class="page header" align="center">These restaurants rock</h3>
                    <ul class="grid-x grid-margin-x page">{showTopThree}</ul>
                </div>
            </div>

            <div align="center">
                <Link to="/restaurants">If you wanna see more TOTALLY RAD RESTAURANTS See All Restaurants!</Link>
            </div>

            <p class="text">These are the coolest reviews you'll ever see (at least until you throw your hat in the ring you killer you)</p>
        </div>
    )
}

export default HomePage