module.exports = {
  local: {
    debug: false,
    client: "pg",
    connection: {
      host: "127.0.0.1",
      port: 5432,
      user: "postgres",
      password: "onyami",
      database: "onyami",
    },
    migrations: {
      directory: "../services/db/migrations",
    },
    seeds: {
      directory: "../services/db/seeds",
    },
  },
}
