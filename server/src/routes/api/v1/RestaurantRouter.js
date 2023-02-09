import express from "express";
import Objection from "objection";
const { ValidationError } = Objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import RestaurantSerializer from "../../../serializers/RestaurantSerializer.js"
import { Restaurant } from "../../../models/index.js";

const restaurantRouter = new express.Router()

restaurantRouter.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.query()
    const serializedRestaurants = await RestaurantSerializer.getSummaries(restaurants)
    return res.status(200).json({ restaurants: serializedRestaurants })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

restaurantRouter.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const restaurant = await Restaurant.query().findById(id)
    const serializedRestaurant = await RestaurantSerializer.getDetails(restaurant)
    return res.status(200).json({ restaurant: serializedRestaurant })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

restaurantRouter.post("/new", async (req, res) => {
  const { formData } = req.body;
  const cleanedFormData = cleanUserInput(formData)

  try {
    const newRestaurant = await Restaurant.query().insertAndFetch(cleanedFormData)
    return res.status(201).json({ newRestaurant })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})



export default restaurantRouter