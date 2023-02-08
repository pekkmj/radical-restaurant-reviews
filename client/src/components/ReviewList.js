import React from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewList = ({ reviews, restaurantId, currentUser }) => {

  const reviewTiles = reviews.map(review => {
    return <ReviewTile key={review.id} review={review} restaurantId={restaurantId} currentUser={currentUser} />
  })

  return (
    <div>
      <h3>Reviews:</h3>
      {reviewTiles}
    </div>
  )
}

export default ReviewList