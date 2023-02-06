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
    const { Restaurant, User } = require("./index.js")

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
      }
    }
  }
}

module.exports = Review