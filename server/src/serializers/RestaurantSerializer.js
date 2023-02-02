import ReviewSerializer from "./ReviewSerializer.js";

class RestaurantSerializer {
  static getSummary(restaurant) {
    const allowedAttributes = ['id', 'name', 'address', 'city', 'state', 'zipCode', 'description']

    let serializedRestaurant  = {}
    for (const attribute of allowedAttributes) {
      serializedRestaurant[attribute] = restaurant[attribute]
    }

    return serializedRestaurant
  }

  static getSummaries(restaurants) {
    return restaurants.map(restaurant => RestaurantSerializer.getSummary(restaurant))
  }

  static async getDetails(restaurant) {
    const serializedRestaurant = RestaurantSerializer.getSummary(restaurant)
    const relatedReviews = await restaurant.$relatedQuery("reviews")
    serializedRestaurant.reviews = relatedReviews.map(review => ReviewSerializer.getSummary(review))
    
    return serializedRestaurant
  }
}

export default RestaurantSerializer