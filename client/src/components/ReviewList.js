import React, { useEffect, useState } from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewList = ({ reviews, currentUser, restaurant, setRestaurant }) => {
  const castVote = async (reviewId, value) => {
    try {
      const voteData = {
        reviewId: reviewId,
        userId: currentUser.id,
        value: value,
      }
      const response = await fetch('/api/v1/votes', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({ voteData: voteData })
      })
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error(`Fetch post error: ${error.name} ${error.message}`)
    }
  }

  const reviewTiles = reviews.map(review => {
    return (
      <div key={review.id} className="callout cell tiles review-tile">
        <ReviewTile
          review={review}
          currentUser={currentUser}
          castVote={castVote}
          reviews={reviews}
          restaurant={restaurant}
          setRestaurant={setRestaurant}
        />
      </div>
    )
  })

  return (
    <div>
      <h3 className="page">Reviews:</h3>
      <div className="grid-x grid-margin-x page">
        {reviewTiles}
      </div>
    </div>
  )
}

export default ReviewList