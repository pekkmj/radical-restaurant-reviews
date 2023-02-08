// import React, { useState } from "react"

// const VoteComp = (props) => {
//   const [voteState, setVoteState] = useState(3)

//   const handleButtonClick = async (event) => {
//     console.log(typeof event.currentTarget.value)
//     await castVote()
//     setVoteState(event.currentTarget.value)

//   }

//   console.log(voteState)


//   let upvoteButtonClass = "";
//   let downvoteButtonClass = "";
//   // switch (voteState) {
//   //   case 1:
//   //     upvoteButtonClass = "success"
//   //     break;
//   //   case -1:
//   //     downvoteButtonClass = "alert"
//   //     break;
//   // }
//   if (voteState == 1) {
//     upvoteButtonClass = "success"
//   } else if (voteState == -1) {
//     downvoteButtonClass = "alert"
//   }

//   // console.log(upvoteButtonClass)
//   // console.log(downvoteButtonClass)
//   return (
//     <>
//       <button className={`button ${upvoteButtonClass}`} value="1" onClick={handleButtonClick}>Upvote</button>
//       <button className={`button ${downvoteButtonClass}`} value="-1" onClick={handleButtonClick}>Downvote</button>
//     </>
//   )
// }

// export default VoteComp