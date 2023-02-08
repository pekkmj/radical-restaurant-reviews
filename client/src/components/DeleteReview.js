import React, { useState } from "react";

const DeleteButton = (props) =>{
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { reviewId, restaurantId } = props 

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
      setShouldRedirect(true)
      return { status: "ok" }
    } catch(err) {
       console.error(`Error in fetch: ${err.message}`)
    }
  }

  if (shouldRedirect) {
    location.href=`/restaurants/${restaurantId}`
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