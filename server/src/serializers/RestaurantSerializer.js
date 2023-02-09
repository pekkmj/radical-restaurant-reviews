import ReviewSerializer from "./ReviewSerializer.js";

class RestaurantSerializer {
  static async getSummary(restaurant) {
    const allowedAttributes = ['id', 'name', 'address', 'city', 'state', 'zipCode', 'description']

    let serializedRestaurant  = {}
    for (const attribute of allowedAttributes) {
      serializedRestaurant[attribute] = restaurant[attribute]
    }

    const relatedReviews = await restaurant.$relatedQuery("reviews")
    serializedRestaurant.averageRating = ReviewSerializer.averageRating(relatedReviews)

    return serializedRestaurant
  }

  static async getSummaries(restaurants) {
    return await Promise.all(restaurants.map(restaurant => RestaurantSerializer.getSummary(restaurant)))
  }

  static async getDetails(restaurant, currentUserId) {
    const serializedRestaurant = RestaurantSerializer.getSummary(restaurant)
    const relatedReviews = await restaurant.$relatedQuery("reviews")
    serializedRestaurant.reviews = await Promise.all(relatedReviews.map(review => {
      return ReviewSerializer.getSummary(review, currentUserId)
    }))

    return serializedRestaurant
  }

  static async getDetailsFromAll(restaurants) {
     return await Promise.all(restaurants.map(restaurant => RestaurantSerializer.getDetails(restaurant)))
  }

}

export default RestaurantSerializer