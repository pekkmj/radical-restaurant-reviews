import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteReview"
import Stars from "./Stars";

const ReviewTile = ({ review, castVote, currentUser, reviews, restaurant, setRestaurant }) => {
  const { id, author, subject, body, rating, votes, userId } = review
  const { score, currentUserVote } = votes
  const [voteState, setVoteState] = useState(currentUserVote.value)

  let deleteButton;
  if (currentUser && currentUser.id === userId) {
    deleteButton = <DeleteButton
      reviewId={id}
      reviews={reviews}
      restaurant={restaurant}
      setRestaurant={setRestaurant}
    />
  }

  const handleButtonClick = async ({ currentTarget }) => {
    if (currentUser) {
      const value = parseInt(currentTarget.value)

      if (value === voteState) {
        setVoteState(null)
      } else {
        setVoteState(value)
      }
      await castVote(id, value)
    } else {
      alert("You must be signed in to vote")
    }
  }

  let upvoteButtonClass = "";
  let downvoteButtonClass = "";
  switch (voteState) {
    case 1:
      upvoteButtonClass = "upvote-button-clicked"
      break
    case -1:
      downvoteButtonClass = "downvote-button-clicked"
      break
  }

  return (
    <div>
      <h4 className="page">{subject}</h4>
      <i>Review by {author.username}</i>
      <Stars stars={rating} />
      <p>{body}</p>
      <p>Score: {score + (voteState ? voteState : 0)}</p>
      <button className={`vote-button upvote-button ${upvoteButtonClass}`} value="1" onClick={handleButtonClick}>Upvote</button>
      <button className={`vote-button downvote-button ${downvoteButtonClass}`} value="-1" onClick={handleButtonClick}>Downvote</button>
      <div>
        {deleteButton}
      </div>
    </div>
  )
}

export default ReviewTile