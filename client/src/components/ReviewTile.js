import React from "react";
import DeleteButton from "./DeleteReview";

const ReviewTile = ({ review, restaurantId, currentUser }) => {
  const { id, subject, body, rating, userId } = review

  let deleteButton = ""
  if (currentUser && currentUser.id === userId){
    deleteButton = <DeleteButton reviewId={id} restaurantId={restaurantId} />
  }

  return (
    <div className="review-tile">
      <h6>{subject}</h6>
      <p>{rating} stars</p>
      <p>{body}</p>
      {deleteButton}
    </div>
  )
}

export default ReviewTile