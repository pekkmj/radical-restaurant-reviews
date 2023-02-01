import React, { useState } from "react";

const NewRestaurantForm = ({ addRestaurant }) => {
    const emptyNewRestaurant = {
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        description: ''
    }
    const [newRestaurant, setNewRestaurant] = useState(emptyNewRestaurant)
    const states = [
        '',
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ]

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
        );
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
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

                <input type="submit" />
            </form>
        </div>
    )
}

export default NewRestaurantForm