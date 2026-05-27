# Lynky (WhatsApp Worker Bot)

Lynky is a WhatsApp bot that connects customers with nearby workers (electricians, plumbers, cleaners) based on service and location. It uses the Baileys WhatsApp Web API and stores worker registrations in MongoDB.

## Features
- WhatsApp login via QR code
- Worker registration flow (name, phone, service, location)
- Customer flow to find available workers by service and locality
- MongoDB-backed worker storage

## Tech Stack
- Node.js + Express
- Baileys (WhatsApp Web API)
- MongoDB + Mongoose
- dotenv

## Prerequisites
- Node.js and npm
- MongoDB connection string
- A WhatsApp account to scan the QR code

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

## Run
```bash
npm start
```
For development with auto-reload:
```bash
npm run dev
```
On first run, scan the QR code shown in the terminal to connect WhatsApp.

## Usage (WhatsApp)
- Send **hi**, **hello**, or **start** to begin the customer flow.
- Send **join** to register as a worker.

## Project Structure
- `src/index.js` — Express server bootstrap and WhatsApp connection
- `src/socket/whatsapp.js` — WhatsApp connection and message routing
- `src/handlers/` — Customer and worker conversation flows
- `src/models/Worker.js` — Worker schema
- `src/utils/` — Services, locations, and in-memory user state

## Notes
- Authentication files are stored in the `auth/` directory (created on first run). Keep them secure.
- Locations and services are currently defined in `src/utils/`.

## Tests
```bash
npm test
```
(Currently a placeholder script.)
