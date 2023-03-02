# Booking Endpoint Implementation

### Endpoints
- POST /api/bookings - Create a new booking for a specific event and user
- GET /api/bookings/:id - Retrieve a specific booking by ID
- PUT /api/bookings/:id - Update an existing booking by ID
- DELETE /api/bookings/:id - Delete a booking by ID
Ticket
- GET /api/bookings - Retrieve a list of bookings (optionally filtered by query parameters)

    - user_id: Filter bookings by user ID
    - event_id: Filter bookings by event ID
    - status: Filter bookings by status (e.g. confirmed, pending, cancelled)
    - sort: Sort bookings by a specific field (e.g. event_id, created_at)
    - limit: Limit the number of bookings returned in the response
    - offset: Skip a certain number of bookings in the result set


```python

from fastapi import APIRouter, Query
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db

router = APIRouter(prefix="/api", tags=["bookings"])


@router.get("/bookings")
def get_bookings(
    db: Session = Depends(get_db),
    user_id: Optional[int] = Query(None),
    event_id: Optional[int] = Query(None),
    status: Optional[str] = Query(None),
    sort: Optional[str] = Query(None),
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0)
):
    query = db.query(models.Booking)
    
    if user_id:
        query = query.filter(models.Booking.user_id == user_id)
    
    if event_id:
        query = query.filter(models.Booking.event_id == event_id)
    
    if status:
        query = query.filter(models.Booking.status == status)
    
    if sort:
        if sort.startswith("-"):
            field = getattr(models.Booking, sort[1:], None)
            if field is not None:
                query = query.order_by(field.desc())
        else:
            field = getattr(models.Booking, sort, None)
            if field is not None:
                query = query.order_by(field.asc())
    
    query = query.limit(limit).offset(offset).all()
    
    return query
```