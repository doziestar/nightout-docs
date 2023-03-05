# Notification Model

**Notification**

Fields:
    - id: String (primary key)
    - message: String
    - user_id: String (foreign key)
    - business_id: String (foreign key)
    - created_at: DateTime
    - updated_at: DateTime

***Relationships***:

- A notification belongs to a user (one-to-many)
- A notification belongs to a business (one-to-many)

```python
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    business_id = Column(Integer, ForeignKey("businesses.id"))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    user = relationship("User", back_populates="notifications")
    business = relationship("Business", back_populates="notifications")

```