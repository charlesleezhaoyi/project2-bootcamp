import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  LoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
//import singaporeflag from "../../Data/singaporeflag.png";
import { realTimeDatabase } from '../../firebase';
import { set, ref } from 'firebase/database';

// const icon = singaporeflag;
// const iconSize = {
//   width: "10px",
//   height: "10px",
// };

const mapContainerStyle = {
  width: '80vw',
  height: '80vh',
  borderRadius: '1.5%',
};
const center = {
  lat: 1.3513,
  lng: 103.81404,
};

export default function RenderMap({ sendMessage, landmarks }) {
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedPlace, setSelectedPlace] = useState({
    lat: 1.3513,
    lng: 103.81404,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const transitLayer = new window.google.maps.TransitLayer();
    const trafficLayer = new window.google.maps.TrafficLayer();
    transitLayer.setMap(mapRef.current);
    trafficLayer.setMap(mapRef.current);
  }, []);

  const onMarkerClick = (position) => {
    mapRef.current.panTo(position);
    mapRef.current.setZoom(15);
  };

  const writeCoordinatesData = (lat = null, lng = null) => {
    const db = realTimeDatabase;
    set(ref(db, 'coordinates/'), {
      latitude: lat,
      longitude: lng,
    });
  };

  // const readCoordinatesData = () => {
  //   const db = realTimeDatabase;
  //   const coordinatesRef = ref(db, "coordinates/");
  //   onValue(coordinatesRef, (snapshot) => {
  //     const coordinates = snapshot.val();
  //     console.log(coordinates);
  //   });
  // };

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    onMarkerClick({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
      )
      .then((res) => {
        if (res.data.results && res.data.results[0]) {
          console.log(res.data.results[0].formatted_address);
          writeCoordinatesData(lat, lng);
          console.log('Coordinates written to Firebase');
          //readCoordinatesData();
        } else {
          console.log('No results found');
        }
        setSelectedPlace(res.data.results[0]);
        sendMessage(
          `You are a world class historian, who is as established as Associate Professor Joey Long, or Dr Masuda Hajimu, with expert knowledge on Singapore's every landmark and building, as well as its relevant historical developments. 
          What is the name of this landmark with the following address:${res.data.results[0].formatted_address}. In just 5 short sentences in bullet point form, separated by \n\n, share related historical events, and what developments occurred in the last 20 years in Singapore. Word limit is 80 words.`,
        );
      });
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    // <LoadScript
    //   googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    //   libraries={libraries}
    // >
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        mapId="6da2495ffc989dca"
        zoom={12}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
        ref={mapRef}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
        {Object.entries(landmarks).map(([name, position]) => (
          <Marker
            key={name}
            position={position}
            onClick={onMapClick}
            //icon={icon}
            //scaledSize="10%"
          />
        ))}
        <Marker
          position={selectedLocation}
          onLoad={() => setMarkerLoaded(true)}
        >
          {markerLoaded && (
            <InfoWindow>
              <div>
                <h2>{selectedPlace.formatted_address}</h2>
              </div>
            </InfoWindow>
          )}
        </Marker>
        {Object.entries(landmarks).map(([name, position]) => (
          <Marker
            key={name}
            position={position}
            onClick={onMapClick}
            //icon={icon}
            //scaledSize="10%"
          />
        ))}
      </GoogleMap>
      // {/* </LoadScript> */}
    </>
  );
}
