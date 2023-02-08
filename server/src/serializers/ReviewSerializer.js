import VoteSerializer from "./VoteSerializer.js"

class ReviewSerializer {
  static async getSummary(review, currentUserId) {
    const allowedAttributes = ['id', 'subject', 'body', 'rating']

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    const relatedVotes = await review.$relatedQuery("votes")
    serializedReview.votes = VoteSerializer.getTotalSummary(relatedVotes, currentUserId)

    return serializedReview
  }
}

export default ReviewSerializer