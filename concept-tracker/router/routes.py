from fastapi import APIRouter, Depends, HTTPException, status
from schemas.schema import ConceptIn, Concept
from uuid import uuid4
from storage.storage import load_concepts, save_concepts

router = APIRouter()
concepts: list[Concept] = load_concepts()


@router.post("/concepts", response_model=Concept, status_code=201)
def create_concept(body: ConceptIn):
    new_concept = Concept(
        id=uuid4().hex,
        name=body.name,
        status=body.status,
        notes=body.notes
    )
    concepts.append(new_concept)
    save_concepts(concepts)
    return new_concept


@router.get("/concepts", response_model=list[Concept], status_code=200)
def list_concept():
    return concepts


@router.put("/concepts/{concept_id}", response_model=Concept, status_code=200)
def update_concept(concept_id: str, body: ConceptIn):
    for c in concepts:
        if c.id == concept_id:
            c.name = body.name
            c.status = body.status
            c.notes = body.notes

            save_concepts(concepts)
            return c

    raise HTTPException(status_code=404, detail="Not found")


@router.delete("/concepts/{concept_id}", status_code=204)
def delete_concept(concept_id: str):
    for c in concepts:
        if c.id == concept_id:
            concepts.remove(c)
            save_concepts(concepts)
            return
    raise HTTPException(status_code=404, detail="Not found")
