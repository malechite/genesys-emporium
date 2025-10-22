import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('character_data', (table) => {
    table.increments('id').primary();
    table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE').notNullable();
    table.string('data_type').notNullable(); // e.g., 'archetype', 'career', 'masterSkills', etc.
    table.jsonb('data').notNullable(); // Store the actual data as JSONB
    table.timestamps(true, true);
    table.unique(['character_id', 'data_type']); // One row per character per data type
    table.index('character_id');
    table.index('data_type');
  });

  // Add comment explaining valid data_types
  await knex.raw(`
    COMMENT ON COLUMN character_data.data_type IS
    'Valid types: archetype, archetypeSpecialSkills, career, careerSkillsRank, creationCharacteristics, critical, currentStrain, currentWound, description, earnedXP, equipmentArmor, equipmentGear, equipmentWeapons, masterMotivations, masterSkills, masterTalents, misc, money, aember, setting, talentModifiers, theme, themes'
  `);
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('character_data');
}

