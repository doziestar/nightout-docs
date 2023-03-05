# Event Endpoint implemtation

### Endpoints
- POST /api/events - Create a new event for a specific business
- GET /api/events/:id - Retrieve a specific event by ID
- PUT /api/events/:id - Update an existing event by ID
- DELETE /api/events/:id - Delete an event by ID
- GET /api/events - Retrieve a list of events (optionally filtered by query parameters)

    - business_id: Filter events by business ID
    - start_date: Filter events by start date
    - end_date: Filter events by end date
    - sort: Sort events by a specific field (e.g. name, start_date, created_at)
    - limit: Limit the number of events returned in the response
    - offset: Skip a certain number of events in the result set

```python

from fastapi import APIRouter, Query
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db

router = APIRouter(prefix="/api", tags=["events"])


@router.get("/events")
def get_events(
    db: Session = Depends(get_db),
    business_id: Optional[int] = Query(None),
    start_date: Optional[datetime] = Query(None),
    end_date: Optional[datetime] = Query(None),
    sort: Optional[str] = Query(None),
    limit: Optional[int] = Query(100),
    offset: Optional[int] = Query(0)
):
    query = db.query(models.Event)
    
    if business_id:
        query = query.filter(models.Event.business_id == business_id)
    
    if start_date:
        query = query.filter(models.Event.start_date >= start_date)
    
    if end_date:
        query = query.filter(models.Event.end_date <= end_date)
    
    if sort:
        if sort.startswith("-"):
            field = getattr(models.Event, sort[1:], None)
            if field is not None:
                query = query.order_by(field.desc())
        else:
            field = getattr(models.Event, sort, None)
            if field is not None:
                query = query.order_by(field.asc())
    
    query = query.limit(limit).offset(offset).all()
    
    return query

```