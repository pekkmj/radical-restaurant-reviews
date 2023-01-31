import { Restaurant } from "../../models/index.js";

class RestaurantSeeder {
    static async seed() {
        const restaurantData = [
            {
                name: "Chuck. E. Cheese",
                address: "29 Mystic View Rd",
                city: "Boston",
                state: "MA",
                zipCode: "02149",
                description: "Happiest place on Earth!"
            }
        ]

        for (const singleRestaurantData of restaurantData){
            const currentRestaurant = await Restaurant.query().findOne(singleRestaurantData)
            if (!currentRestaurant) {
                await Restaurant.query().insert(singleRestaurantData)
            }
        }
    }
}

export default RestaurantSeeder