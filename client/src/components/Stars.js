import React from "react"
import { faStar as solidStar, faStarHalfStroke as halfStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Stars = ({ stars }) => {
  const starNumber = Math.round(stars * 2) / 2

  let icons = [];
  for (let i = 0; i < 5; i++) {
    if (starNumber > i) {
      if (starNumber === i + 0.5) {
        icons.push(<FontAwesomeIcon key={i} icon={halfStar} />)
      } else {
        icons.push(<FontAwesomeIcon key={i} icon={solidStar} />)
      }
    } else {
      icons.push(<FontAwesomeIcon key={i} icon={emptyStar} />)
    }
  }

  return (
    <>{icons}</>
  )
}

export default Stars