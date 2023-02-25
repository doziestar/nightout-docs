## User model:
- id (primary key) string(uuid)
- username (string, unique)
- email (string, unique)
- password (string)
- first_name (string)
- last_name (string)
- avatar (image)
- bio (text)
- created_at (datetime)
- updated_at (datetime)

### Relationships:

- One-to-One with Profile model
- Many-to-Many with Follow model (as follower and followed)
- Many-to-Many with Place model (as liked by)
- Many-to-Many with Event model (as interested in)

## Follow model:
- id (primary key)
- follower_id (foreign key to User model)
- followed_id (foreign key to User model)
- created_at (datetime)
- updated_at (datetime)

### Relationships:

- Belongs to User model (as follower and followed)

### Profile model:
- id (primary key)
- user_id (foreign key to User model)
- location (string)
- website (string)
- birthday (date)
- gender (string)
- interests (text)
- created_at (datetime)
- updated_at (datetime)

### Relationships:

- Belongs to User model (One-to-One)

```Mermaid
    graph TD;
    User-->|1:1|Profile;
    User-->|M:M|Follow;
    Follow-->|belongs to|User;
    Profile-->|belongs to|User;
```