# Minimal NodeJS backend with inversifyJS for fetching dummy data

A simple project written in `Typescript` demonstrates how you could use inversifyJS in NodeJS for better management of dependency injection.

## What it does ?

It fetches dummy data from `https://jsonplaceholder.typicode.com/todos`.

## Prerequisites

- `npm`
- `docker`

## Getting Started

Run the app locally

```
npm install
npm run start:api
```

Run the app with Docker

```
docker-compose up
```

You should have it runned in `localhost:3000`

## Basic Use

```
http://localhost:3000/todos
```

## With Options

```
http://localhost:3000/todos?id=100
http://localhost:3000/todos?pageToken=5&pageSize=20&filterByCompleted=true&userId=1
http://localhost:3000/todos?pageToken=10&pageSize=15
http://localhost:3000/todos?pageToken=10
http://localhost:3000/todos?pageSize=15
```

## To-do / Possible Enhancement

- Rate limit
- Middleware
- Logger
- Sentry
- Graceful shutdown
