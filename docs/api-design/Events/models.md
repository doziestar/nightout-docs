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



```python
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, DateTime, Date, Time
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class Business(Base):
    __tablename__ = "business"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    events = relationship("Event", back_populates="business")


class Event(Base):
    __tablename__ = "event"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    date = Column(Date)
    time = Column(Time)
    location = Column(String)
    description = Column(Text)
    business_id = Column(Integer, ForeignKey("business.id"))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    business = relationship("Business", back_populates="events")
    bookings = relationship("Booking", back_populates="event")
    tickets = relationship("Ticket", back_populates="event")


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    bookings = relationship("Booking", back_populates="user")
    payments = relationship("Payment", back_populates="user")
    notifications = relationship("Notification", back_populates="user")


class Booking(Base):
    __tablename__ = "booking"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    event_id = Column(Integer, ForeignKey("event.id"))
    ticket_id = Column(Integer, ForeignKey("ticket.id"))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="bookings")
    event = relationship("Event", back_populates="bookings")
    ticket = relationship("Ticket", back_populates="bookings")
    payment = relationship("Payment", back_populates="booking")


class Ticket(Base):
    __tablename__ = "ticket"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Integer)
    event_id = Column(Integer, ForeignKey("event.id"))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    event = relationship("Event", back_populates="tickets")
    bookings = relationship("Booking", back_populates="ticket")


class Payment(Base):
    __tablename__ = "payment"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    booking_id = Column(Integer, ForeignKey("booking.id"))
    amount = Column(Integer)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("User", back_populates="payments")
    booking = relationship("Booking", back_populates="payment")


```