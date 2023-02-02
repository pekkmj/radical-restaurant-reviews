import React from "react";

const RestaurantTile = (props) => {
    const {name, address, city, state, zipCode, description} = props.restaurant
    return (
        <div className="callout secondary cell small-6 medium-4 large-3">
           <h3>{name}</h3>
            <p>{address}, {city}, {state}, {zipCode}</p>
            <p>{description}</p> 
        </div>
    )
}

export default RestaurantTile