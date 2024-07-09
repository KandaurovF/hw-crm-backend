# Backend API Documentation

## Overview

This is the backend API for a CRM system. It provides endpoints to manage companies, sales, promotions, and categories. The API is built using Express.js and MongoDB.

## Base URL

http://localhost:4000/api

## Setup

To run this project locally:

1. Clone the repository.
2. Install dependencies: `npm install` or `yarn`
3. Create a `.env` file with the necessary environment variables (see `.env.example`).

## Scripts

- `npm start`: Start the server.
- `npm run start:dev`: Start the server in development mode with nodemon.
- `npm run lint`: Run linting.
- `npm run lint:fix`: Fix linting errors.

## Endpoints

### Companies

#### Get All Companies

- **URL:** `/companies`
- **Method:** `GET`
- **Description:** Retrieves all company records.
- **Response:**
  - `200 OK` on success with an array of company records.

#### Get Company by ID

- **URL:** `/companies/:id`
- **Method:** `GET`
- **Description:** Retrieves a company record by its ID.
- **Parameters:**
  - `id` (string, required): The ID of the company.
- **Response:**
  - `200 OK` on success with the company record.
  - `404 Not Found` if the company is not found.

#### Add a New Company

- **URL:** `/companies`
- **Method:** `POST`
- **Description:** Adds a new company record.
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "description": "string (required)",
    "status": "string (required, one of: 'active', 'notActive', 'pending', 'suspended')",
    "joinedDate": "date (required)",
    "hasPromotions": "boolean (required)",
    "categoryId": "string (required)",
    "categoryTitle": "string (required)",
    "countryId": "string (required)",
    "countryTitle": "string (required)",
    "city": "string (required)",
    "avatar": "string (optional, uri, default: '')"
  }
  ```
- **Response:**
  - `201 Created` on success with the created company record.

### Promotions

#### Get All Promotions

- **URL:** `/promotions`
- **Method:** `GET`
- **Description:** Retrieves all promotion records.
- **Response:**
  - `200 OK` on success with an array of promotion records.

#### Get Promotion by ID

- **URL:** `/promotions/:id`
- **Method:** `GET`
- **Description:** Retrieves a promotion record by its ID.
- **Parameters:**
  - `id` (string, required): The ID of the promotion.
- **Response:**
  - `200 OK` on success with the promotion record.
  - `404 Not Found` if the promotion is not found.

#### Add a New Promotion

- **URL:** `/promotions`
- **Method:** `POST`
- **Description:** Adds a new promotion record.
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "description": "string (required)",
    "discount": "number (required)",
    "companyId": "string (required)",
    "companyTitle": "string (required)",
    "avatar": "string (optional, uri, default: '')"
  }
  ```
- **Response:**
  - `201 Created` on success with the created promotion record.

### Sales

#### Get Sale by ID

- **URL:** `/sales/:id`
- **Method:** `GET`
- **Description:** Retrieves a sale record by its ID.
- **Parameters:**
  - `id` (string, required): The ID of the sale.
- **Response:**
  - `200 OK` on success with the sale record.
  - `404 Not Found` if the sale is not found.

#### Get Sales by Company ID

- **URL:** `/sales/company/:companyId`
- **Method:** `GET`
- **Description:** Retrieves all sales records for a specific company.
- **Parameters:**
  - `companyId` (string, required): The ID of the company.
- **Response:**
  - `200 OK` on success with an array of sales records.
  - `404 Not Found` if no sales are found for the company.

#### Get Sales Summary

- **URL:** `/sales/summary`
- **Method:** `GET`
- **Description:** Retrieves a summary of sales data aggregated by company.
- **Response:**
  - `200 OK` on success with an array of sales summaries.
  - `404 Not Found` if no sales data is found.

### Categories

#### Get all categories

-- **URL:** `/categories`

- **Method:** `GET`
- **Description:** Retrieves a list of all categories, including the number of companies in each category.
- **Response:**
  - `200 OK` on success with an array of categories.
  - `404 Not Found` if no categories data is found.

### Countries

#### Get all countries

-- **URL:** `/countries`

- **Method:** `GET`
- **Description:** Retrieves a list of all countries, including the number of companies in each country.
- **Response:**
  - `200 OK` on success with an array of countries.
  - `404 Not Found` if no countries data is found.

### Cities

#### Get all cities

-- **URL:** `/cities`

- **Method:** `GET`
- **Description:** Retrieves a list of all cities, including the number of companies and the names of companies in each city of each country.
- **Response:**
  - `200 OK` on success with an array of cities.
  - `404 Not Found` if no cities data is found.

### Summary stats

#### Get summary stats

-- **URL:** `/summary-stats`

- **Method:** `GET`
- **Description:** Retrieves a summary of the total promotions, categories, new companies, and active companies.
- **Response:**
  - `200 OK` on success with an object containing the summary stats.
  - `404 Not Found` if no data is found.
