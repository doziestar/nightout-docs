# Payment Endpoints

## Endpoints
- POST /api/payments - Create a new payment for a specific booking and user
- GET /api/payments/:id - Retrieve a specific payment by ID
- PUT /api/payments/:id - Update an existing payment by ID
- DELETE /api/payments/:id - Delete a payment by ID
- GET /api/payments - Retrieve a list of payments (optionally filtered by query parameters):

    - user_id: Filter payments by user ID
    - booking_id: Filter payments by booking ID
    - status: Filter payments by status (e.g. successful, failed, pending)
    - sort: Sort payments by a specific field (e.g. booking_id, amount, created_at)
    - limit: Limit the number of payments returned in the response
    - offset: Skip a certain number of payments in the result set