import React, { useState } from "react";

const DeleteButton = (props) =>{
  const { reviewId, reviews, restaurant, setRestaurant } = props
  
  const deleteReview = async () => {
    try {
        const response = await fetch (`/api/v1/reviews/${reviewId}`, {
        method: "delete",
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })
       if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const returnedReviews = reviews.filter(review => review.id !== reviewId)
      setRestaurant({
        ...restaurant,
        reviews: returnedReviews
      })
      return { message: "reeview has been deleted" }
    } catch(err) {
       console.error(`Error in fetch: ${err.message}`)
    }
  }

  return (
    <>
      <button type="button" className="button" onClick={deleteReview}>
        Delete Review
      </button>
    </>
  )
}

export default DeleteButton