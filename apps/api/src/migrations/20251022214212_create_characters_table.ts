import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('characters', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable();
    table.jsonb('data').notNullable(); // Store full character data as JSONB
    table.timestamps(true, true);
    table.index('user_id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('characters');
}

