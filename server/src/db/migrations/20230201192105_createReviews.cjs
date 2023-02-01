/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("reviews", (table) => {
        table.bigIncrements("id")
        table.string("subject").notNullable()
        table.string("body")
        table.integer("rating").notNullable()
        table.bigInteger("restaurantId")
            .unsigned()
            .index()
            .references("restaurants.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("reviews")
}
