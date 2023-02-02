class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ['id', 'subject', 'body', 'rating']

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    return serializedReview
  }
}

export default ReviewSerializer