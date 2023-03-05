# Ticket Model

**Ticket**

***Relationships***:

- A ticket belongs to an event (one-to-many)
- A ticket can have multiple bookings (one-to-many)

```python

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
```