# Business Endpoint Implementation

**Business**

- POST /api/businesses: Create a new business.
- GET /api/businesses/{id}: Retrieve a specific business by ID.
- PUT /api/businesses/{id}: Update an existing business by ID.
- DELETE /api/businesses/{id}: Delete a business by ID.
- GET /api/businesses/{id}/events: Retrieve a list of events for a specific business by ID.
- GET /api/businesses/{id}/notifications: Retrieve a list of notifications for a specific business by ID.
- GET /api/businesses/{id}/tickets: Retrieve a list of tickets for a specific business by ID.
- GET /api/businesses/{id}/bookings: Retrieve a list of bookings for a specific business by ID.
- GET /api/businesses/{id}/payments: Retrieve a list of payments for a specific business by ID.
- GET /api/businesses/{id}/users: Retrieve a list of users for a specific business by ID.
- GET /api/businesses - Retrieve a list of businesses (optionally filtered by query parameters)
    - name: Filter businesses by name
    - category: Filter businesses by category (e.g. restaurant, hotel, retail)
    - location: Filter businesses by location (e.g. city, state, zip code)
    - sort: Sort businesses by a specific field (e.g. name, category, created_at)
    - limit: Limit the number of businesses returned in the response
offset: Skip a certain number of businesses in the result set

```python

from fastapi import FastAPI, Query
from sqlalchemy.orm import Session

app = FastAPI()

@app.get("/api/businesses")
async def get_businesses(
    name: str = Query(None),
    category: str = Query(None),
    location: str = Query(None),
    sort: str = Query(None),
    limit: int = Query(100),
    offset: int = Query(0),
    db: Session = Depends(get_db)
):
    query = db.query(Business)

    if name:
        query = query.filter(Business.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(Business.category == category)
    if location:
        query = query.filter(Business.location == location)

    if sort:
        if sort.startswith("-"):
            sort_column = getattr(Business, sort[1:]).desc()
        else:
            sort_column = getattr(Business, sort)
        query = query.order_by(sort_column)

    businesses = query.offset(offset).limit(limit).all()

    return {"businesses": businesses}

@app.post("/api/businesses/", response_model=schemas.Business)
def create_business(business: schemas.BusinessCreate, db: Session = Depends(get_db)):
    db_business = models.Business(name=business.name, description=business.description)
    db.add(db_business)
    db.commit()
    db.refresh(db_business)
    return db_business

@app.get("/api/businesses/{business_id}", response_model=schemas.Business)
def read_business(business_id: int, db: Session = Depends(get_db)):
    db_business = db.query(models.Business).filter(models.Business.id == business_id).first()
    if db_business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    return db_business

@app.put("/api/businesses/{business_id}", response_model=schemas.Business)
def update_business(business_id: int, business: schemas.BusinessUpdate, db: Session = Depends(get_db)):
    db_business = db.query(models.Business).filter(models.Business.id == business_id).first()
    if db_business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    db_business.name = business.name
    db_business.description = business.description
    db_business.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_business)
    return db_business

@app.delete("/api/businesses/{business_id}")
def delete_business(business_id: int, db: Session = Depends(get_db)):
    db_business = db.query(models.Business).filter(models.Business.id == business_id).first()
    if db_business is None:
        raise HTTPException(status_code=404, detail="Business not found")
    db.delete(db_business)
    db.commit()
    return {"message": "Business deleted"}

@app.get("/api/businesses/{business_id}/events", response_model=List[schemas.Event])
def read_events_by_business(business_id: int, db: Session = Depends(get_db)):
    db_events = db.query(models.Event).filter(models.Event.business_id == business_id).all()
    return db_events

@app.get("/api/businesses/{business_id}/notifications", response_model=List[schemas.Notification])
def read_notifications_by_business(business_id: int, db: Session = Depends(get_db)):
    db_notifications = db.query(models.Notification).filter(models.Notification.business_id == business_id).all()
    return db_notifications

@app.get("/api/businesses/{business_id}/tickets", response_model=List[schemas.Ticket])
def read_tickets_by_business(business_id: int, db: Session = Depends(get_db)):
    db_tickets = db.query(models.Ticket).filter(models.Ticket.business_id == business_id).all()
    return db_tickets

@app.get("/api/businesses/{business_id}/bookings", response_model=List[schemas.Booking])
def read_bookings_by_business(business_id: int, db: Session = Depends(get_db)):
    db_bookings = db.query(models.Booking).filter(models.Booking.business_id == business_id).all()
    return db_bookings

@app.get("/api/businesses/{business_id}/payments", response_model=List[schemas.Payment])
def read_payments_by_business(business_id: int, db: Session = Depends(get_db)):
    db_payments = db.query(models.Payment).filter(models.Payment.business_id == business_id).all()
    return db_payments

@app.get("/api/businesses/{business_id}/users", response_model=List[schemas.User])
def read_users_by_business(business_id: int, db: Session = Depends(get_db)):
    db_users = db.query(models.User).filter(models.User.business_id == business_id).all()
    return db_users
    
```