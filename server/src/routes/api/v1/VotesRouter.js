import express from "express";

import { Vote } from "../../../models/index.js";

const votesRouter = new express.Router()

votesRouter.post('/', async (req, res) => {
  const { voteData } = req.body

  try {
    const currentUserVote = await Vote.query().findOne({ userId: voteData.userId, reviewId: voteData.reviewId })
    if (currentUserVote) {
      if (currentUserVote.value === voteData.value) {
        await Vote.query().deleteById(currentUserVote.id)
      } else {
        await Vote.query().patch({ value: voteData.value }).where("id", "=", currentUserVote.id)
      }
    } else {
      await Vote.query().insert(voteData)
    }
    return res.status(201)
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

export default votesRouter