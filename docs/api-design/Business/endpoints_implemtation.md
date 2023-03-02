# Business Endpoint Implementation

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