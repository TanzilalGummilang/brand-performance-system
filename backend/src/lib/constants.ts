import 'dotenv/config';

export const dbConfig = {
  host: process.env.DATABASE_HOST ?? '' as string,
  user: process.env.DATABASE_USER ?? '' as string,
  password: process.env.DATABASE_PASSWORD ?? '' as string,
  database: process.env.DATABASE_NAME ?? '' as string,
  connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT ?? '5'),
  url: process.env.DATABASE_URL ?? '' as string
}

const appHost = process.env.APP_HOST ?? 'localhost' as string;
const appPort = Number(process.env.APP_PORT ?? '3000');
export const appConfig = {
  host: appHost,
  port: appPort,
  url: process.env.APP_URL ?? `http://${appHost}:${appPort}` as string
}

export const corsOrigin = process.env.CORS_ORIGIN ?? '' as string;

export const fsaUrl = process.env.FAKE_STORE_API_URL ?? '' as string;
export const btsUrl = process.env.BOOKS_TO_SCRAPE_URL ?? '' as string;