import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "../../generated/prisma/client";
import { dbConfig } from "./constants";

const requiredConfigs = ['host', 'user', 'database'] as const;
for (const key of requiredConfigs) {
  if (dbConfig[key] === undefined || dbConfig[key] === null) {
    throw new Error(`Missing database configuration: ${key}`);
  }
}

const adapter = new PrismaMariaDb({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: dbConfig.connectionLimit
});

const prismaClient = new PrismaClient({ adapter: adapter });

export default prismaClient;