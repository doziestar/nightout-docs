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


```python
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, DateTime, Date, Time
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base





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
```