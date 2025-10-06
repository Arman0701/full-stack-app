# Task Management API

A REST API for managing tasks with user authentication, built with NestJS, Prisma, and MySQL.

## What This Application Does

This is a task management API that allows users to:

- Create, read, update, and delete tasks
- Filter tasks by status (PENDING, IN_PROGRESS, COMPLETED)
- Authenticate with JWT tokens
- Each user can only see and manage their own tasks

## Prerequisites

Before you start, make sure you have these installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **npm** (comes with Node.js)

## How to Run This Application

### Step 1: Start the Database

The application uses MySQL running in Docker. Start it with:

```bash
npm run docker:up
```

This will start:

- MySQL database on port 33066
- Adminer (database viewer) on port 8080

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

### Step 3: Set Up the Database

Generate the Prisma client and create database tables:

```bash
npm run prisma:generate
npm run prisma:migrate
```

When prompted for a migration name, you can use something like "init" or press Enter.

### Step 4: Start the Application

Run the application in development mode:

```bash
npm run start:dev
```

The API will be available at: **http://localhost:3001**

## Using the API

### View API Documentation

Once the app is running, visit: **http://localhost:3001/api**

This shows interactive documentation where you can test all endpoints.

### Quick Test

1. First, create a user account (POST `/api/auth/signup`)
2. Sign in to get your authentication token (POST `/api/auth/signin`)
3. Use the token to create and manage tasks

## Useful Commands

```bash
# Start the app (auto-reloads on code changes)
npm run start:dev

# Stop the database
docker compose down

# View database contents (opens in browser)
npm run prisma:studio


## Troubleshooting

**Database connection error?**
- Make sure Docker is running
- Check that MySQL is started: `docker compose ps`

**Port already in use?**
- Something else might be using port 3001 or 33066
- Stop other applications or change ports in the config files

## Technology Stack

- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **Docker** - Container management

```
