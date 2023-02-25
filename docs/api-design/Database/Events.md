## Event Model:

- id (primary key)
- name (string)
- description (text)
- start_time (datetime)
- end_time (datetime)
- place_id (foreign key to Place model)
- created_at (datetime)
- updated_at (datetime)
### Relationships:

- Belongs to Place model (One-to-Many)
- Many-to-Many with User model (as interested in)