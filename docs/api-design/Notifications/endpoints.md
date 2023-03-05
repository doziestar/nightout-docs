# Notifications API Endpoints


## Endpoints

- POST /api/notifications - Create a new notification for a specific user or business
- GET /api/notifications/:id - Retrieve a specific notification by ID
- PUT /api/notifications/:id - Update an existing notification by ID
- DELETE /api/notifications/:id - Delete a notification by ID

- GET /api/notifications - Retrieve a list of notifications (optionally filtered by query parameters):

    - recipient_id: Filter notifications by recipient ID
    - type: Filter notifications by type (e.g. email, SMS, push)
    - status: Filter notifications by status (e.g. sent, failed, pending)
    - sort: Sort notifications by a specific field (e.g. recipient_id, created_at)
    - limit: Limit the number of notifications returned in the response
    - offset: Skip a certain number of notifications in the result set

```python
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session

from models import Base, Notification, User, Business
from schemas import NotificationCreate, NotificationUpdate, NotificationOut
from database import engine, SessionLocal

Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency to get a database session
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


@app.post("/api/notifications", response_model=NotificationOut)
def create_notification(notification: NotificationCreate, db: Session = Depends(get_db)):
    recipient_type = notification.recipient_type
    recipient_id = notification.recipient_id
    if recipient_type == "user":
        recipient = db.query(User).filter(User.id == recipient_id).first()
    elif recipient_type == "business":
        recipient = db.query(Business).filter(Business.id == recipient_id).first()
    else:
        raise HTTPException(status_code=400, detail="Invalid recipient type")
    if recipient is None:
        raise HTTPException(status_code=404, detail="Recipient not found")
    db_notification = Notification(**notification.dict())
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification


@app.get("/api/notifications/{notification_id}", response_model=NotificationOut)
def get_notification(notification_id: int, db: Session = Depends(get_db)):
    db_notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    return db_notification


@app.put("/api/notifications/{notification_id}", response_model=NotificationOut)
def update_notification(notification_id: int, notification: NotificationUpdate, db: Session = Depends(get_db)):
    db_notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    for field, value in notification.dict(exclude_unset=True).items():
        setattr(db_notification, field, value)
    db.commit()
    db.refresh(db_notification)
    return db_notification


@app.delete("/api/notifications/{notification_id}")
def delete_notification(notification_id: int, db: Session = Depends(get_db)):
    db_notification = db.query(Notification).filter(Notification.id == notification_id).first()
    if db_notification is None:
        raise HTTPException(status_code=404, detail="Notification not found")
    db.delete(db_notification)
    db.commit()
    return {"message": "Notification deleted"}


@app.get("/api/notifications", response_model=List[NotificationOut])
def get_notifications(
    recipient_id: Optional[int] = None,
    type: Optional[str] = None,
    status: Optional[str] = None,
    sort: Optional[str] = None,
    limit: Optional[int] = None,
    offset: Optional[int] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Notification)
    if recipient_id is not None:
        query = query.filter(Notification.recipient_id == recipient_id)
    if type is not None:
        query = query.filter(Notification.type == type)
    if status is not None:
        query = query.filter(Notification.status == status)
    if sort is not None:
        if sort.startswith("-"):
            sort_field = getattr(Notification, sort[1:]).desc()
        else:
            sort_field = getattr(Notification, sort)
        query = query.order_by(sort_field)
    if limit is not None:
        query = query.limit(limit)
    if offset is not None:
        query = query.offset(offset)
    return query.all()
```