from pydantic import BaseModel
from typing import Literal


class ConceptIn(BaseModel):
    name: str
    status: Literal["pending", "completed"] = "pending"
    notes: str


class Concept(BaseModel):
    id: str
    name: str
    status: Literal["pending", "completed"] = "pending"
    notes: str
