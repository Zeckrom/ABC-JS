# ABC Javascript

## Setup

Create `.env` file (see `.env.example`)

## Installation

`npm install`

## DEV

`npm run start:dev`

## PROD

`npm start`

## TEST

For the tests we are using jest and supertest (to be able to test the endpoints) and mongo-memory-server (to create a db instance for the sake of the test and use it without touching the main db)

To run the tests, run `npm run test`

## Docker

The app is dockerized and can be started via docker containers.
