import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Oslo, capital of Norway",
    description: "One of the most beautiful city in the world",
    imageUrl:
      "https://www.shutterstock.com/image-photo/view-over-oslo-norway-fjord-260nw-2191521437.jpg",
    location: {
      lat: 59.9139,
      lng: 10.7522,
    },
    address: "Langkaia 1, 0150 Oslo",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Oslo, capital of Norway",
    description: "One of the most beautiful city in the world",
    imageUrl:
      "https://www.shutterstock.com/image-photo/view-over-oslo-norway-fjord-260nw-2191521437.jpg",
    location: {
      lat: 59.9139,
      lng: 10.7522,
    },
    address: "Langkaia 1, 0150 Oslo",
    creator: "u2",
  },
];
const UserPlaces = () => {
  const {userId} = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
