# User

## Endpoints
    - POST /api/users - Create a new user
    - GET /api/users/:id - Retrieve a specific user by ID
    - PUT /api/users/:id - Update an existing user by ID
    - DELETE /api/users/:id - Delete a user by ID
    - GET /api/users/:id/messages_sent - Retrieve a list of messages sent by a specific user by ID
    - GET /api/users/:id/messages_received - Retrieve a list of messages received by a specific user by ID
    - GET /api/users/:id/conversations - Retrieve a list of conversations a specific user is a participant in by ID
    - GET /api/users/:id/groups - Retrieve a list of groups a specific user is a member of by ID
    - GET /api/users/:id/voice_notes_sent - Retrieve a list of voice notes sent by a specific user by ID
    - GET /api/users/:id/voice_notes_received - Retrieve a list of voice notes received by a specific user by ID
    - GET /api/users/:id/notifications - Retrieve a list of notifications for a specific user by ID
    - GET /api/users/:id/bookings - Retrieve a list of bookings made by a specific user by ID
    - GET /api/users/:id/payments - Retrieve a list of payments made by a specific user by ID