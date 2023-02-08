const Model = require("./Model.js");

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["subject", "rating"],
      properties: {
        subject: { type: "string" },
        body: { type: "string" },
        rating: { type: ["integer", "string"] }
      }
    }
  }

  static get relationMappings() {
    const { Restaurant, User, Vote } = require("./index.js")

    return {
      restaurant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Restaurant,
        join: {
          from: "reviews.restaurantId",
          to: "restaurants.id"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id"
        }
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId"
        }
      }
    }
  }
}

module.exports = Review