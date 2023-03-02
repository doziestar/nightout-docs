# Notifications API Endpoints


## Endpoints

- POST /api/notifications - Create a new notification for a specific user or business
- GET /api/notifications/:id - Retrieve a specific notification by ID
- PUT /api/notifications/:id - Update an existing notification by ID
- DELETE /api/notifications/:id - Delete a notification by ID

- GET /api/notifications - Retrieve a list of notifications (optionally filtered by query parameters):

    - recipient_id: Filter notifications by recipient ID
    - type: Filter notifications by type (e.g. email, SMS, push)
    - status: Filter notifications by status (e.g. sent, failed, pending)
    - sort: Sort notifications by a specific field (e.g. recipient_id, created_at)
    - limit: Limit the number of notifications returned in the response
    - offset: Skip a certain number of notifications in the result set