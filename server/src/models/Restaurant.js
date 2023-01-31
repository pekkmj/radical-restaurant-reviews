const Model = require("./Model.js");

class Restaurant extends Model {
    static get tableName() {
        return "restaurants"
    }
}

module.exports = Restaurant