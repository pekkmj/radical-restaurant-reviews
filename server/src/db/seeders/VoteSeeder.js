import { Review, Vote } from "../../models/index.js";

class VoteSeeder {
  static async seed() {
    const chuckECheeseReviewData = [
      {
        userId: 1,
        subject: "Best restaurant ever",
        body: "Tasty food, good entertainment",
        rating: 5
      }
    ]
    const chuckECheeseFirstReview = await Review.query().findOne(chuckECheeseReviewData[0])
    
    const chuckECheeseFirstReviewVoteData = [
      {
        value: 1,
        userId: 1,
        reviewId: 1
      }
    ]
    for (const singleVoteData of chuckECheeseFirstReviewVoteData) {
      const currentVote = await Vote.query().findOne(singleVoteData)
      if (!currentVote) {
        await chuckECheeseFirstReview.$relatedQuery("votes").insert(singleVoteData)
      }
    }
  }
}

export default VoteSeeder