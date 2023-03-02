## Chat models

### Message model:

- id (int): the unique identifier for the message
- sender_id (int): the ID of the user who sent the message
- recipient_id (int): the ID of the user or group that received the message
- message_text (str): the text content of the message
- message_type (str): the type of message (text, image, voice note, etc.)
- timestamp (datetime): the time the message was sent
- delivered (bool): indicates whether the message has been - delivered to the recipient(s)
- read (bool): indicates whether the message has been read by the recipient(s)

### Conversation model:

- id (int): the unique identifier for the conversation
- participants (List[int]): the IDs of the users participating in the conversation
- last_message_timestamp (datetime): the timestamp of the most recent message in the conversation

### Group model:

- id (int): the unique identifier for the group
- name (str): the name of the group
- description (str): a description of the group
- members (List[int]): the IDs of the users who are members of the group

### VoiceNote model:

- id (int): the unique identifier for the voice note
- sender_id (int): the ID of the user who sent the voice note
- recipient_id (int): the ID of the user or group that received the voice note
- voice_note_file (str): the file path or URL of the voice note
- timestamp (datetime): the time the voice note was sent
- delivered (bool): indicates whether the voice note has been delivered to the recipient(s)
- read (bool): indicates whether the voice note has been listened to by the recipient(s)

## Model Relationships
1. One-to-Many Relationship between User and Message models: A user can send and receive multiple messages, but each message belongs to only one sender and one recipient. Therefore, the Message model has foreign keys to the User model for both sender and recipient.

2. Many-to-Many Relationship between User and Conversation models: A conversation involves multiple users, and each user can participate in multiple conversations. Therefore, the Conversation model has a Many-to-Many relationship with the User model through a separate table (e.g., ConversationParticipant) that maps the participants to their respective conversations.

3. Many-to-Many Relationship between User and Group models: A user can be a member of multiple groups, and a group can have multiple members. Therefore, the Group model has a Many-to-Many relationship with the User model through a separate table (e.g., GroupMembership) that maps the users to their respective groups.

4. One-to-Many Relationship between Conversation and Message models: A conversation can have multiple messages, but each message belongs to only one conversation. Therefore, the Message model has a foreign key to the Conversation model.

5. One-to-Many Relationship between Group and Message models: A group chat can have multiple messages, but each message belongs to only one group. Therefore, the Message model has a foreign key to the Group model.

6. One-to-Many Relationship between User and VoiceNote models: A user can send and receive multiple voice notes, but each voice note belongs to only one sender and one recipient. Therefore, the VoiceNote model has foreign keys to the User model for both sender and recipient.

```python

from datetime import datetime
from typing import List
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

conversation_participant_table = Table('conversation_participant', Base.metadata,
    Column('conversation_id', Integer, ForeignKey('conversation.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
)

group_membership_table = Table('group_membership', Base.metadata,
    Column('group_id', Integer, ForeignKey('group.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
)


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    messages_sent = relationship('Message', back_populates='sender')
    messages_received = relationship('Message', back_populates='recipient')
    conversations = relationship('Conversation', secondary=conversation_participant_table, back_populates='participants')
    groups = relationship('Group', secondary=group_membership_table, back_populates='members')
    voice_notes_sent = relationship('VoiceNote', back_populates='sender')
    voice_notes_received = relationship('VoiceNote', back_populates='recipient')


class Conversation(Base):
    __tablename__ = 'conversation'

    id = Column(Integer, primary_key=True, index=True)
    last_message_timestamp = Column(DateTime)
    participants = relationship('User', secondary=conversation_participant_table, back_populates='conversations')
    messages = relationship('Message', back_populates='conversation')


class Group(Base):
    __tablename__ = 'group'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    members = relationship('User', secondary=group_membership_table, back_populates='groups')
    messages = relationship('Message', back_populates='group')


class Message(Base):
    __tablename__ = 'message'

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey('user.id'))
    recipient_id = Column(Integer, ForeignKey('user.id'))
    conversation_id = Column(Integer, ForeignKey('conversation.id'))
    group_id = Column(Integer, ForeignKey('group.id'))
    message_text = Column(String)
    message_type = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    delivered = Column(Boolean, default=False)
    read = Column(Boolean, default=False)
    sender = relationship('User', back_populates='messages_sent', foreign_keys=[sender_id])
    recipient = relationship('User', back_populates='messages_received', foreign_keys=[recipient_id])
    conversation = relationship('Conversation', back_populates='messages')
    group = relationship('Group', back_populates='messages')


class VoiceNote(Base):
    __tablename__ = 'voice_note'

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey('user.id'))
    recipient_id = Column(Integer, ForeignKey('user.id'))
    voice_note_file = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    delivered = Column(Boolean, default=False)
    read = Column(Boolean, default=False)
    sender = relationship('User', back_populates='voice_notes_sent', foreign_keys=[sender_id])
    recipient = relationship('User', back_populates='voice_notes_received', foreign_keys=[recipient_id])


```