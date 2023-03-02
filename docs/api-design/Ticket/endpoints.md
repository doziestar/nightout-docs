# Tickets Endpoints

## Endpoints
- POST /api/tickets - Create a new ticket for a specific event
- GET /api/tickets/:id - Retrieve a specific ticket by ID
- PUT /api/tickets/:id - Update an existing ticket by ID
- DELETE /api/tickets/:id - Delete a ticket by ID
GET /api/tickets - Retrieve a list of tickets (optionally filtered by query parameters):

    - event_id: Filter tickets by event ID
    - status: Filter tickets by status (e.g. available, sold, reserved)
    - sort: Sort tickets by a specific field (e.g. event_id, price, created_at)
    - limit: Limit the number of tickets returned in the response
    - offset: Skip a certain number of tickets in the result set