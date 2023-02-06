import express from "express";
import Objection from "objection";
const { ValidationError } = Objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import { Review } from "../../../models/index.js";

const reviewsRouter = new express.Router()

reviewsRouter.post('/', async (req, res) => {
  const { formData } = req.body
  const cleanedFormData = cleanUserInput(formData)

  try {
    const newReview = await Review.query().insertAndFetch(cleanedFormData)
    return res.status(201).json({ review: newReview })
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data })
    }
    return res.status(500).json({ errors: err })
  }
})

export default reviewsRouter