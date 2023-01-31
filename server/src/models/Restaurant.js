const Model = require("./Model.js");

class Restaurant extends Model {
    static get tableName() {
        return "restaurants"
    }

    static get jsonSchema () {
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
}

module.exports = Restaurant