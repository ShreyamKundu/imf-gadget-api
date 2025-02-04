# IMF Gadget API

## Overview

The **IMF Gadget API** is designed to manage gadgets for the Impossible Missions Force (IMF). It supports operations like retrieving gadgets, adding new ones, updating gadget details, decommissioning gadgets, and triggering self-destruct sequences.

## Links:
- **Live API**: [Live Link](https://imf-gadget-api-fjnt.onrender.com)
- **Swagger Documentation**: [Swagger Docs](https://imf-gadget-api-fjnt.onrender.com/api/docs/) (Ensure this is set up correctly)

## Features:
- **Gadget Inventory**:
  - **GET**: Retrieve all gadgets with a randomly generated "mission success probability".
  - **POST**: Add a new gadget with a unique codename.
  - **PATCH**: Update an existing gadget’s details.
  - **DELETE**: Mark a gadget as "Decommissioned" and add a decommission timestamp (does not permanently delete the gadget).
- **Self-Destruct**:
  - **POST**: Trigger the self-destruct sequence for a gadget with a confirmation code.

## Technologies Used:
- **Node.js**
- **Express.js**
- **PostgreSQL** with **Prisma ORM**
- **JWT Authentication** for securing routes

## Endpoints:
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login to receive a JWT token.
- **POST /api/auth/logout**: Log out a user.
- **GET /api/gadgets**: Retrieve all gadgets (with optional filtering by status).
- **POST /api/gadgets**: Add a new gadget.
- **PATCH /api/gadgets/:id**: Update an existing gadget.
- **DELETE /api/gadgets/:id**: Mark a gadget as decommissioned (does not delete the gadget).
- **POST /api/gadgets/:id/self-destruct**: Trigger self-destruct for a gadget.

