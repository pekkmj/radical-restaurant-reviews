import { Restaurant } from "../../models/index.js";

class RestaurantSeeder {
  static async seed() {
    const restaurantData = [
      {
        name: "Chuck E. Cheese",
        address: "29 Mystic View Rd",
        city: "Boston",
        state: "Massachusetts",
        zipCode: "02149",
        description: "Happiest place on Earth!"
      },
      {
        name: "Five Guys Burgers and Fries",
        address: "58 Summer St",
        city: "Boston",
        state: "Massachusetts",
        zipCode: "02110",
        description: ""
      },
      {
        name: "Ichiban",
        address: "462 Quincy Ave",
        city: "Braintree",
        state: "Massachusetts",
        zipCode: "02184",
        description: "Hotpot and sushi"
      },
      {
        name: "Anna's Taqueria",
        address: "242 Cambridge St",
        city: "Boston",
        state: "Massachusetts",
        zipCode: "02114",
        description: "Mexican fine dining"
      },
      {
        name: "Chili's",
        address: "1040 Revere Beach Pkwy",
        city: "Chelsea",
        state: "Massachusetts",
        zipCode: "02150",
        description: "Has everything"
      }
    ]

    for (const singleRestaurantData of restaurantData) {
      const currentRestaurant = await Restaurant.query().findOne(singleRestaurantData)
      if (!currentRestaurant) {
        await Restaurant.query().insert(singleRestaurantData)
      }
    }
  }
}

export default RestaurantSeeder