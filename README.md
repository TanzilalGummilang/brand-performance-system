# Brand Performance System

This project is a simple backend and frontend application that allows you to synchronize data from a Fake Store API (https://fakestoreapi.com) and Book to Scrape (https://books.toscrape.com) and store it in a MySQL/MariaDB database.

This project fetch data products from Fake Store API and scrape data from Book to Scrape and save them to the database.

This project uses the following technologies:
- Node.js
- Express with TypeScript
- MySQL/MariaDB
- Prisma
- Vite
- React with TypeScript
- Tailwind
- Axios
- Cors
- Cheerio

## Backend

### Requirements
- Node v22 or higher
- MariaDB or MySQL

### Setup
1. Run `npm install`
2. Create Database
3. Copy .env.example to .env and fill it with your database credentials
4. Adjust .env if needed except Fake Store API and Book to Scrape URLs
5. Run `npx prisma migrate dev`
6. Run `npx prisma generate`
7. Run `npm run dev`

### Usage
1. Trigger a sync by calling `http://localhost:3000/api/products/sync` with a POST request in Postman. This will fetch products from Fake Store API and Book to Scrape and save them to the database.
2. Retrieve all products by calling `http://localhost:3000/api/products` with a GET request in Postman. This will return a list of all products in the database.

## Frontend

### Requirements
- Node v22 or higher

### Setup
1. Make sure Backend is running
2. Run `npm install`
3. Run `npm run dev`

### Usage
1. Copy .env.example to .env and fill it with your Backend URL
2. Navigate to `http://localhost:5173/`
3. You will see a list of products. Click "Synchronize Data" to fetch latest products from the backend.