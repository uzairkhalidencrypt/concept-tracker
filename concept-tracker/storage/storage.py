import json
import os
from schemas.schema import Concept

FILE_PATH = "concepts.json"


def load_concepts() -> list[Concept]:
    # if the file doesnt exist return empty list
    if not os.path.exists(FILE_PATH):
        return []

    # open the file read the json and turn into list of concept obj
    with open(FILE_PATH, "r") as f:
        content = f.read
        if not content:
            return []
        data = json.load(f)
        return [Concept(**item) for item in data]


def save_concepts(concepts: list[Concept]):
    # turn the list of concept obj into plain dict
    data = [c.model_dump() for c in concepts]

    with open(FILE_PATH, "w") as f:
        json.dump(data, f, indent=2)
