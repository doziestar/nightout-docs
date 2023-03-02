# Business Model

**Business**

Fields:
    - id: Integer (primary key)
    - name: String
    - description: Text
    - created_at: DateTime
    - updated_at: DateTime

***Relationships***:

- A business can create multiple events (one-to-many)

- A business can create multiple notifications (one-to-many)
- A business can create multiple tickets (one-to-many)
- A business can create multiple bookings (one-to-many)
- A business can create multiple payments (one-to-many)
- A business can create multiple users (one-to-many)

```python
class Business(Base):
    __tablename__ = "business"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    events = relationship("Event", back_populates="business")
    notifications = relationship("Notification", back_populates="business")
    tickets = relationship("Ticket", back_populates="business")
    bookings = relationship("Booking", back_populates="business")
    payments = relationship("Payment", back_populates="business")
    users = relationship("User", back_populates="business")
```