class ReviewSerializer {
  static getSummary(review) {
    const allowedAttributes = ['id', 'subject', 'body', 'rating', 'userId']

    let serializedReview = {}
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute]
    }
    
    return serializedReview
  }
}

export default ReviewSerializer