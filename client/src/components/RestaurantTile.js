import React from "react";
import { Link } from "react-router-dom";

const RestaurantTile = (props) => {
  const { id, name, address, city, state, zipCode, description } = props.restaurant
  return (
    <div>
      <h3>
        <Link to={`/restaurants/${id}`} class="tileLink">{name}</Link>
      </h3>
      <p>{address}, {city}, {state}, {zipCode}</p>
      <p>{description}</p>
    </div>
  )
}

export default RestaurantTile