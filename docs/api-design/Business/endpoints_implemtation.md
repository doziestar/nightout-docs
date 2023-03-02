# Business Endpoint Implementation

**Business**

- POST /api/businesses - Create a new business
- GET /api/businesses/:id - Retrieve a specific business by ID
- PUT /api/businesses/:id - Update an existing business by ID
- DELETE /api/businesses/:id - Delete a business by ID
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


```