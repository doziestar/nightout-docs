## Database Implementation

```python
from typing import List, Optional
from sqlmodel import SQLModel, create_engine, Relationship

# Define database connection URL
DATABASE_URL = "sqlite:///./test.db"

# Create the database engine
engine = create_engine(DATABASE_URL, echo=True)

# Define the User model
class User(SQLModel, table=True):
    id: Optional[int] = None
    username: str
    password: str
    email: str
    profile_picture: Optional[str] = None
    messages: List["Message"] = Relationship(back_populates="user")

# Define the Message model
class Message(SQLModel, table=True):
    id: Optional[int] = None
    sender_id: int
    recipient_id: int
    message_text: str
    message_type: str
    timestamp: str
    delivered: bool = False
    read: bool = False
    user: Optional[User] = Relationship(back_populates="messages")
    conversation: Optional["Conversation"] = Relationship(back_populates="messages")
    group: Optional["Group"] = Relationship(back_populates="messages")

# Define the Conversation model
class Conversation(SQLModel, table=True):
    id: Optional[int] = None
    participants: List[int]
    last_message_timestamp: str
    messages: List[Message] = Relationship(back_populates="conversation")

# Define the Group model
class Group(SQLModel, table=True):
    id: Optional[int] = None
    name: str
    description: Optional[str] = None
    members: List[int]
    messages: List[Message] = Relationship(back_populates="group")

# Define the VoiceNote model
class VoiceNote(SQLModel, table=True):
    id: Optional[int] = None
    sender_id: int
    recipient_id: int
    voice_note_file: str
    timestamp: str
    delivered: bool = False
    read: bool = False
    user: Optional[User] = Relationship(back_populates="voice_notes")

    def __str__(self):
        return f"{self.__class__.__name__} {self.id}, {self.sender_id} -> {self.recipient_id}"
        
    __repr__ = __str__

# Create the database tables
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Instantiate the database session
def get_session():
    with engine.connect() as conn:
        session = SQLModel.Session(bind=conn)
        try:
            yield session
        finally:
            session.close()
```