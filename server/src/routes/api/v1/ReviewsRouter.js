import express from "express";
import Objection from "objection";
const { ValidationError } = Objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import { Review } from "../../../models/index.js";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js";

const reviewsRouter = new express.Router()

reviewsRouter.post('/', async (req, res) => {
  const { formData } = req.body
  const cleanedFormData = cleanUserInput(formData)

  try {
    const newReview = await Review.query().insertAndFetch(cleanedFormData)
    const serializedNewReview = await ReviewSerializer.getSummary(newReview)
    return res.status(201).json({ review: serializedNewReview })
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data })
    }
    return res.status(500).json({ errors: err })
  }
})

reviewsRouter.delete("/:id", async (req,res)=>{
  try {
    await Review.query().findById(req.params.id).delete()

    return res.status(204).json({ message: "review has been deleted!" })
  } catch (err) {
    return res.status(500).json({errors: err})
  }
})

export default reviewsRouter