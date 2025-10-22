import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_settings', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.integer('last_character_id').unsigned().references('id').inTable('characters').onDelete('SET NULL');
    table.jsonb('preferences').defaultTo('{}');
    table.timestamps(true, true);
    table.unique('user_id');
    table.index('user_id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_settings');
}

