import React from "react";
import { Link } from "react-router-dom";

import Stars from "./Stars.js";

const RestaurantTile = ({ restaurant }) => {
  const { id, name, address, city, state, zipCode, description, averageRating } = restaurant

  let fixedRating = 0
  if (averageRating) {
    fixedRating = averageRating.toFixed(1) 
  }

  if (fixedRating === 0) {
    fixedRating = "N/A"
  }

  return (
    <div>
      <div className="rating">{fixedRating} <Stars stars={averageRating} /></div>
      <div className="tileBody">
        <h3>
          <Link to={`/restaurants/${id}`} className="tileLink">{name}</Link>
        </h3>
        <p>{address}, {city}, {state}, {zipCode}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default RestaurantTile