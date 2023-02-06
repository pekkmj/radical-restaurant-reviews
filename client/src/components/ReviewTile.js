import React from "react";

const ReviewTile = ({ review }) => {
  const { subject, body, rating } = review

  return (
    <div className="review-tile">
      <h6>{subject}</h6>
      <p>{rating} stars</p>
      <p>{body}</p>
    </div>
  )
}

export default ReviewTile