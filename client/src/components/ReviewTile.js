import React, { useState, useEffect } from "react";
import VoteComp from "./VoteComp.js";

const ReviewTile = ({ review, castVote, currentUser }) => {
  const { id, subject, body, rating, votes } = review
  const { score, currentUserVote } = votes
  const [voteState, setVoteState] = useState(null)
  // console.log(typeof voteState)
  // console.log(voteState)
  console.log(review)
  console.log(`rendering reviewTile id: ${review.id}`)
  console.log(`current user vote: ${currentUserVote}`)
  console.log(`vote state: ${voteState}`)
  console.log("")
  // console.log(`reviewtile ${review.id} render`)
  // console.log(review.votes.currentUserVote)

  const handleButtonClick = async (event) => {
    if (currentUser) {
      const { currentTarget } = event
      const value = parseInt(currentTarget.value)

      if (voteState) {
        if (value === voteState) {
          setVoteState(null)
        } else {
          setVoteState(value)
        }
      } else {
        setVoteState(value)
      }
      await castVote(id, value)

    } else {
      alert("You must be signed in to vote")
    }
  }

  useEffect(() => {
    setVoteState(currentUserVote.voteValue)
  }, [review])

  let upvoteButtonClass = "";
  let downvoteButtonClass = "";
  if (voteState === 1) {
    upvoteButtonClass = "success"
  } else if (voteState === -1) {
    downvoteButtonClass = "alert"
  }

  return (
    <div className="review-tile">
      <h6>{subject}</h6>
      <p>{rating} stars</p>
      <p>{body}</p>
      <p>Score: {score + (voteState ? voteState : 0)}</p>
      <button className={`button ${upvoteButtonClass}`} value="1" onClick={handleButtonClick}>Upvote</button>
      <button className={`button ${downvoteButtonClass}`} value="-1" onClick={handleButtonClick}>Downvote</button>
    </div>
  )
}

export default ReviewTile