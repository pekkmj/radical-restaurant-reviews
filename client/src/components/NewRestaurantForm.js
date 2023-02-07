import React, { useState } from "react";

import states from "./constants/states.js";
import ErrorList from "./layout/ErrorList.js";

const NewRestaurantForm = ({ addRestaurant, errors }) => {
  const emptyNewRestaurant = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: ''
  }
  const [newRestaurant, setNewRestaurant] = useState(emptyNewRestaurant)

  const handleInputChange = (event) => {
    setNewRestaurant({
      ...newRestaurant,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (await addRestaurant(newRestaurant)) {
      clearForm()
    }
  }

  const clearForm = () => {
    setNewRestaurant(emptyNewRestaurant);
  }

  const stateOptions = states.map(state => {
    return (
      <option key={state} value={state}>{state}</option>
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x align-center">
        <form className="cell medium-6" onSubmit={handleSubmit}>
          <ErrorList errors={errors} />
          <h3>Add a new restaurant</h3>

          <label htmlFor="name">
            Name: <input type="text" name="name" onChange={handleInputChange} value={newRestaurant.name} />
          </label>

          <label htmlFor="address">
            Address: <input type="text" name="address" onChange={handleInputChange} value={newRestaurant.address} />
          </label>

          <label htmlFor="city">
            City: <input type="text" name="city" onChange={handleInputChange} value={newRestaurant.city} />
          </label>

          <label htmlFor="state">
            State:
            <select name="state" onChange={handleInputChange} value={newRestaurant.state}>
              {stateOptions}
            </select>
          </label>

          <label htmlFor="zipCode">
            Zipcode: <input type="text" name="zipCode" onChange={handleInputChange} value={newRestaurant.zipCode} />
          </label>

          <label htmlFor="description">
            Description: <input type="text" name="description" onChange={handleInputChange} value={newRestaurant.description} />
          </label>

          <input type="submit" className="button" />
        </form>
      </div>
    </div>
  )
}

export default NewRestaurantForm