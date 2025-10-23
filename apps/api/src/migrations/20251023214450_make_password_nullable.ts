import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Make password nullable for OAuth users
  await knex.schema.alterTable('users', (table) => {
    table.string('password').nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Revert password to not nullable
  await knex.schema.alterTable('users', (table) => {
    table.string('password').notNullable().alter();
  });
}

