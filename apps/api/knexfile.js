"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.POSTGRES_HOST || 'localhost',
            port: parseInt(process.env.POSTGRES_PORT || '5432'),
            database: process.env.POSTGRES_DB || 'genesys_emporium',
            user: process.env.POSTGRES_USER || 'emporium',
            password: process.env.POSTGRES_PASSWORD || 'emporium_dev'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/migrations',
            tableName: 'knex_migrations',
            extension: 'ts'
        },
        seeds: {
            directory: './src/seeds'
        }
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './dist/migrations',
            tableName: 'knex_migrations'
        }
    }
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map