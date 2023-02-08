import express from "express";

import { Vote } from "../../../models/index.js";

const votesRouter = new express.Router()

votesRouter.post('/', async (req, res) => {
  const { voteData } = req.body

  try {
    const currentUserVote = await Vote.query().findOne({ userId: voteData.userId, reviewId: voteData.reviewId })
    if (currentUserVote) {
      if (currentUserVote.voteValue === voteData.voteValue) {
        await Vote.query().deleteById(currentUserVote.id)
      } else {
        await Vote.query().patch({ voteValue: voteData.voteValue }).where("id", "=", currentUserVote.id)
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