import React, { useState, useEffect } from "react"
import RestaurantTile from "./RestaurantTile"
import { Link } from "react-router-dom"



const HomePage = (props) => {

    const [restaurants, setRestaurants] = useState([])
    const [errors, setErrors] = useState({})
    
    let restaurantSeed = {
        restaurant: [
        {
                id: 1,
                name: "Chuck E. Cheese",
                address: "29 Mystic View Rd",
                city: "Boston",
                state: "Massachusetts",
                zipCode: "02149",
                description: "Happiest place on Earth!",
                rating: 2
        },
        {
            id: 2,
            name: "Wendy's",
            address: "28 Mystic View Rd",
            city: "Canada",
            state: "Westwood",
            zipCode: "02459",
            description: "It's a place",
            rating: 7
        },
        {
            id: 3,
            name: "Cheerios",
            address: "88 BoB RoAd",
            city: "Bangkok",
            state: "Canada",
            zipCode: "22232",
            description: "Cereal is real food",
            rating: 5
        },
        {
            id: 4,
            name: "Raisins",
            address: "29 Booty Ave",
            city: "Parkwood",
            state: "Butamax",
            zipCode: "69696",
            description: "It's not a strip club I swear",
            rating: 1
        },
        {
            id: 5,
            name: "Burger King",
            address: "Chicken Ave",
            city: "Cambridge",
            state: "Massachusetts",
            zipCode: "02232",
            description: "We gots the meat",
            rating: 9
        }
    ]
}
    

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

    const top3Restaurants = () => {

        let sample1 = restaurantSeed.restaurant

        sample1.sort((a, b) => {
            return a.rating - b.rating
        })

        let sample2 = []

        let sample3 = []

        for (let i = 0; i < 3; i++) {
            sample2.push(sample1.splice(-1, 1))
        }

        sample3.push(sample2[0][0])
        sample3.push(sample2[1][0])
        sample3.push(sample2[2][0])

        console.log(sample2)

        console.log(sample3)

        return sample3
        
    }


    let currentTop = top3Restaurants()

    

    const showTopThree = currentTop.map((restaurant) => {
        return (
            <div class="callout secondary cell small-4 medium-4 large-4">
                <RestaurantTile
                key={restaurant.id}
                restaurant={restaurant}
                />
            </div>
            
        )
    })

    
    
    //   useEffect(() => {
    //     getRestaurants()
    //   }, [])

    return (
        <div>
            <h2>Welcome to the most Radical Review Roadblock</h2>

            <p>Hey there fellow x-gamer! Have you ever been to restaurant and thought to yourself "man this is totatally not tubular man!" Well we share your pain dude guy man. We want to bring to you a place where you can totally check out the best places and put the poopy buttholes in their place!</p>


            <div class="grid-container">
            <div>
            <h3 align="center">These restaurants rock</h3>
                <ul class="grid-x grid-margin-x">{showTopThree}</ul>
            </div>
            </div>
            
            <div align="center">
                <Link to="/restaurants">If you wanna see more TOTALLY RAD RESTAURANTS See All Restaurants!</Link>
            </div>

            <p>These are the coolest reviews you'll ever see (at least until you throw your hat in the ring you killer you)</p>
            
            <div>
                // Top 3 reviews
            </div>

            <div>
                // Link to see all reviews
            </div>

        </div>
    )

}

export default HomePage