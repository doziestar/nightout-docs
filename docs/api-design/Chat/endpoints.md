## Chat endpoints

1. List conversations for user: GET chats/users/{user_id}/conversations
2. Create conversation: POST chats/conversations
3. Retrieve conversation: GET chats/conversations/{conversation_id}
4. Update conversation: PUT chats/conversations/{conversation_id}
5. Delete conversation: DELETE chats/conversations/{conversation_id}
6. List messages for conversation: GET chats/conversations/{conversation_id}/messages
7. Create message: POST chats/messages
8. Retrieve message: GET chats/messages/{message_id}
9. Update message: PUT chats/messages/{message_id}
10. Delete message: DELETE chats/messages/{message_id}
11. Create group: POST chats/groups
12. Retrieve group: GET chats/groups/{group_id}
13. Update group: PUT chats/groups/{group_id}
14. Delete group: DELETE chats/groups/{group_id}
15. List members for group: GET chats/groups/{group_id}/members
16. Add member to group: POST chats/groups/{group_id}/members
17. Remove member from group: DELETE chats/groups/{group_id}/members/{member_id}
18. Create voice note: POST chats/voicenotes
19. Retrieve voice note: GET chats/voicenotes/{voicenote_id}
20. Update voice note: PUT chats/voicenotes/{voicenote_id}
21. Delete voice note: DELETE chats/voicenotes/{voicenote_id}

## Chat endpoint implementation

```python
from fastapi import FastAPI, HTTPException
from typing import List
from sqlmodel import Session, select
from models import User, Conversation, Message, Group, VoiceNote, Member, database

app = FastAPI()

# List conversations for user
@app.get("/users/{user_id}/conversations", response_model=List[Conversation])
def list_conversations_for_user(user_id: int, skip: int = 0, limit: int = 100):
    with Session(database) as session:
        conversations = session.exec(select(Conversation).where(Conversation.participants.contains(user_id)).offset(skip).limit(limit)).all()
        return conversations

# Create conversation
@app.post("/conversations", response_model=Conversation)
def create_conversation(conversation: Conversation):
    with Session(database) as session:
        session.add(conversation)
        session.commit()
        session.refresh(conversation)
        return conversation

# Retrieve conversation
@app.get("/conversations/{conversation_id}", response_model=Conversation)
def retrieve_conversation(conversation_id: int):
    with Session(database) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        return conversation

# Update conversation
@app.put("/conversations/{conversation_id}", response_model=Conversation)
def update_conversation(conversation_id: int, updated_conversation: Conversation):
    with Session(database) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        conversation.participants = updated_conversation.participants
        session.commit()
        session.refresh(conversation)
        return conversation

# Delete conversation
@app.delete("/conversations/{conversation_id}")
def delete_conversation(conversation_id: int):
    with Session(database) as session:
        conversation = session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        session.delete(conversation)
        session.commit()
        return {"message": "Conversation deleted successfully"}

# List messages for conversation
@app.get("/conversations/{conversation_id}/messages", response_model=List[Message])
def list_messages_for_conversation(conversation_id: int, skip: int = 0, limit: int = 100):
    with Session(database) as session:
        messages = session.exec(select(Message).where(Message.recipient_id == conversation_id).offset(skip).limit(limit)).all()
        return messages

# Create message
@app.post("/messages", response_model=Message)
def create_message(message: Message):
    with Session(database) as session:
        session.add(message)
        session.commit()
        session.refresh(message)
        return message

# Retrieve message
@app.get("/messages/{message_id}", response_model=Message)
def retrieve_message(message_id: int):
    with Session(database) as session:
        message = session.get(Message, message_id)
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        return message

# Update message
@app.put("/messages/{message_id}", response_model=Message)
def update_message(message_id: int, updated_message: Message):
    with Session(database) as session:
        message = session.get(Message, message_id)
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        message.message_text = updated_message.message_text
        message.message_type = updated_message.message_type
        session.commit()
        session.refresh(message)
        return message

# Delete message
@app.delete("/messages/{message_id}")
def delete_message(message_id: int):
    with Session(database) as session:
        message = session.get(Message, message_id)
        if not message:
            raise HTTPException(status_code=404, detail="Message not found")
        session.delete(message)
        session.commit()
        return {"message": "Message deleted successfully"}

# Create a new group
@app.post("/groups", response_model=schemas.Group)
def create_group(group: schemas.GroupCreate, db: Session = Depends(get_db)):
    db_group = models.Group(name=group.name, description=group.description)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group


# Get a group by id
@app.get("/groups/{group_id}", response_model=schemas.Group)
def read_group(group_id: int, db: Session = Depends(get_db)):
    db_group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    return db_group


# Update a group by id
@app.put("/groups/{group_id}", response_model=schemas.Group)
def update_group(group_id: int, group: schemas.GroupUpdate, db: Session = Depends(get_db)):
    db_group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    db_group.name = group.name
    db_group.description = group.description
    db.commit()
    db.refresh(db_group)
    return db_group


# Delete a group by id
@app.delete("/groups/{group_id}")
def delete_group(group_id: int, db: Session = Depends(get_db)):
    db_group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    db.delete(db_group)
    db.commit()
    return {"message": "Group deleted successfully"}


# Get all members of a group
@app.get("/groups/{group_id}/members", response_model=List[schemas.User])
def read_group_members(group_id: int, db: Session = Depends(get_db)):
    db_group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    return db_group.members


# Add a user to a group
@app.post("/groups/{group_id}/members", response_model=schemas.Group)
def add_group_member(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = db.query(models.Group).filter(models.Group.id == group_id).first()
    if not db_group:
        raise HTTPException(status_code=404, detail="Group not found")
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_group.members.append(db_user)
    db.commit()
    db.refresh(db_group)
    return db_group

# Create voice note
@app.post("/voicenotes", response_model=VoiceNote)
def create_voice_note(voicenote: VoiceNote, db: Session = Depends(get_session)):
    db.add(voicenote)
    db.commit()
    db.refresh(voicenote)
    return voicenote

# Retrieve voice note
@app.get("/voicenotes/{voicenote_id}", response_model=VoiceNote)
def read_voice_note(voicenote_id: int, db: Session = Depends(get_session)):
    voicenote = db.get(VoiceNote, voicenote_id)
    if not voicenote:
        raise HTTPException(status_code=404, detail="Voice note not found")
    return voicenote

# Update voice note
@app.put("/voicenotes/{voicenote_id}", response_model=VoiceNote)
def update_voice_note(voicenote_id: int, voicenote: VoiceNote, db: Session = Depends(get_session)):
    db_voicenote = db.get(VoiceNote, voicenote_id)
    if not db_voicenote:
        raise HTTPException(status_code=404, detail="Voice note not found")
    update_data = voicenote.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_voicenote, key, value)
    db.commit()
    db.refresh(db_voicenote)
    return db_voicenote

# Delete voice note
@app.delete("/voicenotes/{voicenote_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_voice_note(voicenote_id: int, db: Session = Depends(get_session)):
    voicenote = db.get(VoiceNote, voicenote_id)
    if not voicenote:
        raise HTTPException(status_code=404, detail="Voice note not found")
    db.delete(voicenote)
    db.commit()
    return {"message": "Voice note deleted successfully"}
```