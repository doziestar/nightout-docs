# Payment Model

**Payment**

Fields:
    - id: Integer (primary key)
    - user_id: Integer (foreign key)
    - booking_id: Integer (foreign key)
    - amount: Integer
    - created_at: DateTime
    - updated_at: DateTime

***Relationships***:

- A payment belongs to a user (one-to-many)
- A payment belongs to a booking (one-to-many)

```python
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