import { Restaurant, Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const chuckECheese = await Restaurant.query().findById(1)
    const chuckECheeseReviewData = [
      {
        subject: "Best restaurant ever",
        body: "adsdsa",
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