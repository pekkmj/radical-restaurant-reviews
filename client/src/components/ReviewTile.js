import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteReview"

const ReviewTile = ({ review, castVote, currentUser, reviews, restaurant, setRestaurant }) => {
  const { id, author, subject, body, rating, votes, userId } = review
  const { score, currentUserVote } = votes
  const [voteState, setVoteState] = useState(currentUserVote.value)

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
      <p>Score: {score + voteState}</p>
      <button className={`button ${upvoteButtonClass}`} value="1" onClick={handleButtonClick}>Upvote</button>
      <button className={`button ${downvoteButtonClass}`} value="-1" onClick={handleButtonClick}>Downvote</button>
      {deleteButton}
    </div>
  )
}

export default ReviewTile