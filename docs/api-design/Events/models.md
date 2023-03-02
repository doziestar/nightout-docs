# Models Associated with Events

## Event

- id (integer, auto-increment)
- name (string)
- date (date)
- time (time)
- location (string)
- description (text)
- business_id (integer, foreign key)
- created_at (datetime)
- updated_at (datetime)

***Relationships***:

- An event belongs to a business (one-to-many)
- An event can have multiple bookings (one-to-many)
- An event can have multiple ticket types (one-to-many)

**User**

***Relationships***:

- A user can create multiple bookings (one-to-many)
- A user can make multiple payments (one-to-many)
- A user can receive multiple notifications (one-to-many)

**Business**

***Relationships***:

- A business can create multiple events (one-to-many)

**Booking**

***Relationships***:

- A booking belongs to a user (one-to-many)
- A booking belongs to an event (one-to-many)
- A booking belongs to a ticket (one-to-many)

**Ticket**

***Relationships***:

- A ticket belongs to an event (one-to-many)
- A ticket can have multiple bookings (one-to-many)

**Payment**

***Relationships***:

- A payment belongs to a user (one-to-many)
- A payment belongs to a booking (one-to-many)

**Notification**

***Relationships***:

- A notification belongs to a user (one-to-many)
- A notification belongs to a business (one-to-many)