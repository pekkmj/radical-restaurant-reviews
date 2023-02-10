import VoteSerializer from "./VoteSerializer.js"
import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getSummary(review, currentUserId) {
    const allowedAttributes = ['id', 'subject', 'body', 'rating', 'userId']

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    const relatedVotes = await review.$relatedQuery("votes")
    serializedReview.votes = VoteSerializer.getTotalSummary(relatedVotes, currentUserId)
    const relatedUser = await review.$relatedQuery("user")
    serializedReview.author = UserSerializer.getSummary(relatedUser)

    return serializedReview
  }

  static averageRating(reviews) {
    return reviews.length? reviews.reduce((tot, review) => tot + review.rating, 0) / reviews.length : 0
  }
}

export default ReviewSerializer