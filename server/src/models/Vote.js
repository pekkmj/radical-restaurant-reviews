const Model = require("./Model.js");

class Vote extends Model {
  static get tableName() {
    return "votes"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["value"],
      properties: {
        voteValue: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { Review, User } = require("./index.js")

    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: "votes.reviewId",
          to: "reviews.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "votes.userId",
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Vote