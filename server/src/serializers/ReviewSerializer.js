import VoteSerializer from "./VoteSerializer.js"
import UserSerializer from "./UserSerializer.js"

class ReviewSerializer {
  static async getSummary(review, currentUserId) {
    const allowedAttributes = ['id', 'subject', 'body', 'rating']

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
}

export default ReviewSerializer