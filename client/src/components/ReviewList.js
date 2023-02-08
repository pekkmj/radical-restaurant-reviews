import React from "react"

import ReviewTile from "./ReviewTile.js"

const ReviewList = ({ reviews, currentUser }) => {
  const castVote = async (reviewId, voteValue) => {
    try {
      const voteData = {
        reviewId: reviewId,
        userId: currentUser.id,
        voteValue: voteValue,
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
    return <ReviewTile key={review.id} review={review} currentUser={currentUser} castVote={castVote} />
  })

  return (
    <div>
      <h3>Reviews:</h3>
      {reviewTiles}
    </div>
  )
}

export default ReviewList