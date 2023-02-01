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
		const { Restaurant } = require("./index.js")

		return {
			restaurant: {
				relation: Model.BelongsToOneRelation,
				modelClass: Restaurant,
				join: {
					from: "reviews.restaurantId",
					to: "restaurants.id"
				}
			}
		}
	}
}

module.exports = Review