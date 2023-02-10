import React from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewList = ({ reviews, currentUser }) => {
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
      <div class="callout cell tiles review-tile">
        <ReviewTile key={review.id} review={review} currentUser={currentUser} castVote={castVote} />
      </div>
    )
  })

  return (
    <div>
      <h3 className="page">Reviews:</h3>
      <div class="grid-y grid-margin-y page">
        {reviewTiles}
      </div>
    </div>
  )
}

export default ReviewList