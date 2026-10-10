# Added because react components use different aliases for the data

from datetime import datetime

from pydantic import BaseModel, Field


class Event(BaseModel):
    id: int
    city: str = Field(serialization_alias="eventCity")
    title: str = Field(serialization_alias="eventTitle")
    event_date: datetime = Field(serialization_alias="eventDate")
    event_description: str | None = Field(serialization_alias="eventDescription")
    images: list[str] = Field(serialization_alias="eventImages")


class Story(BaseModel):
    id: int
    title: str
    story_description: str | None = Field(serialization_alias="description")
    content: str | None
    images: list[str]


class Member(BaseModel):
    id: int
    member_type: str = Field(serialization_alias="type")
    member_name: str = Field(serialization_alias="name")
    member_description: str | None = Field(serialization_alias="description")
    image: str | None