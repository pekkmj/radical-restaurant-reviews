import express from "express";
import { Restaurant } from "../../../models/index.js";

import Objection from "objection";
const { ValidationError } = Objection

import cleanUserInput from "../../../services/cleanUserInput.js";

const restaurantRouter = new express.Router()

restaurantRouter.get("/", async (req, res) => {
	try {
		const restaurants = await Restaurant.query()
		return res.status(200).json({ restaurants: restaurants })
	} catch (error) {
		return res.status(500).json({ errors: error })
	}
})

restaurantRouter.get("/:id", async (req, res) => {
	const { id } = req.params

	try {
		const restaurant = await Restaurant.query().findById(id)
		restaurant.reviews = await restaurant.$relatedQuery("reviews")
		return res.status(200).json({ restaurant: restaurant })
	} catch (error) {
		return res.status(500).json({ errors: error })
	}
})

restaurantRouter.use("/:id/reviews", async (req, res) => {
	//posting reviews
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