/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', table => {
        table.increments('project_id')
        table.string('project_name').notNullable()
        table.text('project_description')
        table.boolean('project_completed').defaultTo(false)
    })
    .createTable('resources', table => {
        table.increments('resource_id')
        table.string('resource_name').notNullable().unique()
        table.text('resource_description')
    })
    .createTable('tasks', table => {
        table.increments('task_id')
        table.text('task_description').notNullable()
        table.text('task_notes')
        table.boolean('task_completed').defaultTo(false)
        table
            .integer('project_id')
            .notNullable()
            .unsigned()
            .references('project_id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
    .createTable('project_resource', table => {
        table.increments('project_resource_id')
        table
            .integer('project_id')
            .notNullable()
            .unsigned()
            .references('project_id')
            .inTable('projects')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        table
            .integer('resource_id')
            .notNullable()
            .unsigned()
            .references('resource_id')
            .inTable('resources')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('project_resource')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
