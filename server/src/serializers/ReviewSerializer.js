class ReviewSerializer {
  static getSummary(review) {
    const allowedAttributes = ['id', 'subject', 'body', 'rating']

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }

    return serializedReview
  }

  static averageRating(reviews) {
    return reviews.length? reviews.reduce((tot, review) => tot + review.rating, 0) / reviews.length : 0
  }
}

export default ReviewSerializer