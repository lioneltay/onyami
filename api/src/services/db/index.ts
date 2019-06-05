import knex from "knex"
import knexConfig from "config/knexfile"

export const db = knex(knexConfig.local)
