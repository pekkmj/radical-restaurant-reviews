import React from "react";
import DeleteButton from "./DeleteReview";

const ReviewTile = ({ review, currentUser, reviews, restaurant, setRestaurant }) => {
  const { id, subject, body, rating, userId } = review

  let deleteButton = ""
  if (currentUser && currentUser.id === userId){
    deleteButton = <DeleteButton reviewId={id} reviews={reviews} restaurant={restaurant} setRestaurant={setRestaurant}/>
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