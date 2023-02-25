## Place Model:

- id (primary key)
- name (string)
- address (string)
- latitude (float)
- longitude (float)
- description (text)
- created_at (datetime)
- updated_at (datetime)
### Relationships:

- One-to-Many with Event model (a place can have many events)
- Many-to-Many with User model (as liked by)
x
User Model:

id (primary key)
username (string, unique)
email (string, unique)
password (string)
first_name (string)
last_name (string)
avatar (image)
bio (text)
created_at (datetime)
updated_at (datetime)
Relationships:

Many-to-Many with Place model (as liked by)
Many-to-Many with Event model (as interested in)