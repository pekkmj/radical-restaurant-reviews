const Model = require("./Model.js");

class Restaurant extends Model {
  static get tableName() {
    return "restaurants"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "address", "city", "state", "zipCode"],
      properties: {
        name: { type: "string" },
        address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        zipCode: { type: "string", minLength: 5 }
      }
    }
  }

  static get relationMappings() {
    const { Review } = require("./index.js")

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "restaurants.id",
          to: "reviews.restaurantId"
        }
      }
    }
  }
}

module.exports = Restaurant