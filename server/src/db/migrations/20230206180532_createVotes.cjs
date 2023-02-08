/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("votes", (table) => {
    table.bigIncrements("id")
    table.integer("voteValue").notNullable()
    table.bigInteger("reviewId")
      .unsigned()
      .index()
      .references("reviews.id")
    table.bigInteger("userId")
      .unsigned()
      .index()
      .references("users.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("votes")
}
