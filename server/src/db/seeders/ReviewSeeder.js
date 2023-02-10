import { Restaurant, Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewsData = {
      1: [
        {
          userId: 1,
          subject: "Best restaurant ever",
          body: "Tasty food, good entertainment",
          rating: 5
        },
        {
          userId: 2,
          subject: "Scam",
          body: "I spent $100 and only got 17 tickets",
          rating: 1
        }
      ],
      2: [
        {
          userId: 1,
          subject: "Expensive",
          body: "It's good but this place is hella expensive dude",
          rating: 3
        }
      ]
    }

    let restaurant
    for (let restaurantId in reviewsData) {
      restaurant = await Restaurant.query().findById(restaurantId)

      for (const singleReviewData of reviewsData[restaurantId]) {
        const currentReview = await Review.query().findOne(singleReviewData)
        if (!currentReview) {
          await restaurant.$relatedQuery("reviews").insert(singleReviewData)
        }
      }
    }
  }
}

export default ReviewSeeder