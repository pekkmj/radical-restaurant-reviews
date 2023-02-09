import React, { useEffect, useState } from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewList = ({ reviews, currentUser, restaurant, setRestaurant }) => {

  const reviewTiles = reviews.map(review => {
    return <ReviewTile key={review.id} review={review} currentUser={currentUser} reviews={reviews} restaurant={restaurant} setRestaurant={setRestaurant}/>
  })

  return (
    <div>
      <h3>Reviews:</h3>
      {reviewTiles}
    </div>
  )
}

export default ReviewList