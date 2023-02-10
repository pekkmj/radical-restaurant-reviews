import React from "react";
import { Link } from "react-router-dom";

import Stars from "./Stars.js";

const RestaurantTile = ({ restaurant }) => {
  const { id, name, address, city, state, zipCode, description, averageRating } = restaurant

  let fixedRating = 0  
  if (averageRating) {
    fixedRating = averageRating.toFixed(1)
  }

  return (
    <div class="callout cell small-4 medium-4 large-4 tiles">
      <div><Stars stars={averageRating}/></div>
      <div class="rateString">{fixedRating} Stars</div>
      <div class="tileBody">
      <h3>
        <Link to={`/restaurants/${id}`} class="tileLink">{name}</Link>
      </h3>
        <p>{address}, {city}, {state}, {zipCode}</p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default RestaurantTile