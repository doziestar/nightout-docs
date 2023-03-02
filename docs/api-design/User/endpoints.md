# User

## Endpoints
- GET /api/users - Retrieve a list of users (optionally filtered by query parameters):
    - name: Filter users by name
    - email: Filter users by email
    - sort: Sort users by a specific field (e.g. name, email, created_at)
    - limit: Limit the number of users returned in the response
    - offset: Skip a certain number of users in the result set
Business