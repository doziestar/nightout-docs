# Booking Model

**Booking**

Fields:
    - id: Integer (primary key)
    - user_id: Integer (foreign key)
    - event_id: Integer (foreign key)
    - ticket_id: Integer (foreign key)
    - created_at: DateTime
    - updated_at: DateTime

***Relationships***:

- A booking belongs to a user (one-to-many)
- A booking belongs to an event (one-to-many)
- A booking belongs to a ticket (one-to-many)


```python
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
```