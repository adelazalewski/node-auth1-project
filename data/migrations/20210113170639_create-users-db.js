
exports.up =async function(knex) {
  await knex.schema.createTable("users", tbl => {
      tbl.increments("id")
      tbl.text("username").notNull().unique()
      tbl.text("password").notNull()
  })
};

exports.down =async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
