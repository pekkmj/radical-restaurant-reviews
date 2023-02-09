import React from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewList = ({ reviews }) => {

  const reviewTiles = reviews?.map(review => {
    return <ReviewTile key={review.id} review={review} />
  })

  return (
    <div>
      <h3>Reviews:</h3>
      {reviewTiles}
    </div>
  )
}

export default ReviewList