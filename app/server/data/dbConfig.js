import dotenv from "dotenv";
dotenv.config();

import knex from "knex";
const environment = process.env.NODE_ENV || "development";
import config from "../knexfile";

export default knex(config[environment]);
