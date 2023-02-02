import React from "react";
import { Link } from "react-router-dom";

const RestaurantTile = (props) => {
    const { id, name, address, city, state, zipCode, description } = props.restaurant
    return (
      <div className="callout secondary cell small-6 medium-4 large-3">
        <h3>
          <Link to={`/restaurants/${id}`}>{name}</Link>
        </h3>
        <p>{address}, {city}, {state}, {zipCode}</p>
        <p>{description}</p>
      </div>
    )
}

export default RestaurantTile