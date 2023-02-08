import { Restaurant, Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const chuckECheese = await Restaurant.query().findById(1)
    const chuckECheeseReviewData = [
      {
        userId: 1,
        subject: "Best restaurant ever",
        body: "Tasty food, good entertainment",
        rating: 5
      }
    ]

    for (const singleReviewData of chuckECheeseReviewData) {
      const currentReview = await Review.query().findOne(singleReviewData)
      if (!currentReview) {
        await chuckECheese.$relatedQuery("reviews").insert(singleReviewData)
      }
    }
  }
}

export default ReviewSeeder