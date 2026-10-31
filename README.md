
# Price Tracker - MERN Stack

A full-stack web application that tracks Amazon product prices and sends automated email notifications when prices drop below a user-defined target.

## Features

- User registration and login
- JWT-based authentication
- Add, update and delete products
- Amazon product price scraping
- Custom target price monitoring
- Automated email notifications
- Price history tracking
- Interactive price charts
- Search and dark mode

## Tech Stack

**Frontend**
- React.js
- Bootstrap
- Axios
- Recharts

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

**Other Tools**
- Axios
- Cheerio
- Node-Cron
- Nodemailer

## Project Structure

client/  - React frontend
server/  - Node.js and Express backend

## Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Install backend dependencies:

cd server
npm install

Install frontend dependencies:

cd ../client
npm install

## Configuration

Create separate .env files inside client and server.

Configure MongoDB, JWT and email credentials in server/.env.

Configure the frontend API URL in client/.env.

Never commit environment files or credentials.

## Run the Application

Start backend:

cd server
npm start

Start frontend in another terminal:

cd client
npm start

Frontend: http://localhost:3000
Backend: http://localhost:5000

## Future Improvements

- Support multiple shopping websites
- Deploy frontend and backend
- Improve price history analytics
- Add more robust scraping and monitoring
