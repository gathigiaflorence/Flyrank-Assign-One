# Flyrank-Assign-One

This repository contains the budget and expense tracker app built for the assignment.

## Features
- Dashboard overview with financial summary cards
- Transactions tracking page
- Budget planning page
- Reports page
- Settings page
- Health check page that fetches data
- Responsive layout for desktop and mobile screens

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app locally:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Environment variables
Create a `.env` file from `.env.example` and set values like:

```bash
VITE_APP_NAME=BudgetFlow
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Deployment
This project is configured for Vercel deployment with a `vercel.json` file and a Vite build output.

