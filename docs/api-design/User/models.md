# User Model

**User**

Fields:
    - id: String (primary key)
    - name: String
    - email: String (unique)
    - hashed password: String
    - created_at: DateTime
    - updated_at: DateTime
    - is_active: Boolean
    - is_superuser: Boolean
    - is_business: Boolean
    - is_verified: Boolean
    - is_blocked: Boolean
    - is_deleted: Boolean
    - is_online: Boolean
    

***Relationships***:
    - A user has many bookings (one-to-many)
    - A user has many payments (one-to-many)
    - A user has many messages sent (one-to-many)
    - A user has many messages received (one-to-many)
    - A user has many voice notes sent (one-to-many)
    - A user has many voice notes received (one-to-many)
    - A user has many conversations (many-to-many)
    - A user has many groups (many-to-many)
    - A user has many notifications (one-to-many)
    - A user has many bookings (one-to-many)
    - A user has many payments (one-to-many)



```python
class User(Base):
    __tablename__ = 'user'

    id = Column(String, primary_key=True, index=True, default=uuid4())
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    messages_sent = relationship('Message', back_populates='sender')
    messages_received = relationship('Message', back_populates='recipient')
    conversations = relationship('Conversation', secondary=conversation_participant_table, back_populates='participants')
    groups = relationship('Group', secondary=group_membership_table, back_populates='members')
    voice_notes_sent = relationship('VoiceNote', back_populates='sender')
    voice_notes_received = relationship('VoiceNote', back_populates='recipient')
    notifications = relationship('Notification', back_populates='user')
    bookings = relationship("Booking", back_populates="user")
    payments = relationship("Payment", back_populates="user")
```