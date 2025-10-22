import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const customContentTables = [
    'custom_archetypes',
    'custom_archetype_talents',
    'custom_armor',
    'custom_careers',
    'custom_gear',
    'custom_motivations',
    'custom_settings',
    'custom_skills',
    'custom_talents',
    'custom_vehicles',
    'custom_weapons'
  ];

  for (const tableName of customContentTables) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
      table.string('name').notNullable();
      table.jsonb('data').notNullable(); // Store all custom content data as JSONB
      table.specificType('read_access', 'integer[]').defaultTo('{}'); // Array of user IDs with read access
      table.specificType('write_access', 'integer[]').defaultTo('{}'); // Array of user IDs with write access
      table.timestamps(true, true);
      table.index('user_id');
      table.index('name');
    });
  }
}


export async function down(knex: Knex): Promise<void> {
  const customContentTables = [
    'custom_archetypes',
    'custom_archetype_talents',
    'custom_armor',
    'custom_careers',
    'custom_gear',
    'custom_motivations',
    'custom_settings',
    'custom_skills',
    'custom_talents',
    'custom_vehicles',
    'custom_weapons'
  ];

  for (const tableName of customContentTables) {
    await knex.schema.dropTable(tableName);
  }
}
