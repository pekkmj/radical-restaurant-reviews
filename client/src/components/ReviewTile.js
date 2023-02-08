import React, { useState, useEffect } from "react";

const ReviewTile = ({ review, castVote, currentUser }) => {
  const { id, author, subject, body, rating, votes } = review
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
      upvoteButtonClass = "success"
      break
    case -1:
      downvoteButtonClass = "alert"
      break
  }

  return (
    <div className="review-tile">
      <h6>{subject}</h6>
      <p>{author.username}</p>
      <p>{rating} stars</p>
      <p>{body}</p>
      <p>Score: {score + (voteState ? voteState : 0)}</p>
      <button className={`button ${upvoteButtonClass}`} value="1" onClick={handleButtonClick}>Upvote</button>
      <button className={`button ${downvoteButtonClass}`} value="-1" onClick={handleButtonClick}>Downvote</button>
    </div>
  )
}

export default ReviewTile