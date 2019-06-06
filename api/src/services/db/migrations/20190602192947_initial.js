exports.up = async function(knex, Promise) {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE folder (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      parent_id UUID REFERENCES folder(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name VARCHAR(100)
    );

    CREATE TABLE document (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      folder_id UUID REFERENCES folder(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name VARCHAR(100) NOT NULL,
      content TEXT DEFAULT ''
    );

    INSERT INTO folder (id, parent_id, name) VALUES
      ('11111111-1111-1111-1111-111111111111', null, 'Vegetables'),
      ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Greens'),
      ('33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Tubles'),
      ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Beans'),
      ('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'Kidney'),
      ('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'Chick Peas');
  `)
}

exports.down = function(knex, Promise) {
  return knex.raw(`
    DROP TABLE Document;
    DROP TABLE Folder;
  `)
}
