# Library Management System

A full-stack Library Management System built using React, Node.js, Express, PostgreSQL, and JWT Authentication.

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

### Dashboard

* Total Books
* Total Members
* Issued Books
* Available Books

### Books Management

* Add Book
* View Books
* Update Book
* Delete Book

### Members Management

* Add Member
* View Members
* Update Member
* Delete Member

### Transactions

* Issue Book
* Return Book
* Transaction History
* Automatic Book Quantity Updates

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* Vite

### Backend

* Node.js
* Express.js
* JWT
* bcrypt

### Database

* PostgreSQL

## Database Tables

### Users

* id
* username
* password

### Books

* id
* title
* author
* quantity

### Members

* id
* name
* email

### Transactions

* id
* book_id
* member_id
* issue_date
* return_date
* status

## Installation

### Clone Repository

```bash
git clone https://github.com/navinkumar4214/Library-Management-System.git
cd Library-Management-System
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=library_db
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret_key
```

Start backend:

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

## Project Structure

```text
Library-Management
│
├── backend
│   ├── middleware
│   ├── routes
│   ├── db.js
│   └── server.js
│
├── frontend
│   ├── components
│   ├── pages
│   └── src
│
└── README.md
```

## Future Improvements

* Fine calculations
* Search Books
* Search Members
* Pagination
* Role-Based Access Control
* Better UI Design
* Responsive Layout

## Author

Navinkumar

GitHub:
https://github.com/navinkumar4214
