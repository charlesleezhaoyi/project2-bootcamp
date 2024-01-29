import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
  DirectionsService,
} from '@react-google-maps/api';
import axios from 'axios';
//import singaporeflag from "../../Data/singaporeflag.png";

// const icon = singaporeflag;
// const iconSize = {
//   width: "10px",
//   height: "10px",
// };

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 1.3513,
  lng: 103.81404,
};

function RenderMap({ sendMessage, landmarks, onDirectionsResult }) {
  const [libraries] = useState(['places']);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markerLoaded, setMarkerLoaded] = useState(false);
  // const [selectedLocation, setSelectedLocation] = useState({
  //   lat: null,
  //   lng: null,
  // });
  const [selectedPlace, setSelectedPlace] = useState({
    lat: 1.3513,
    lng: 103.81404,
  });
  const [userStartLocation, setUserStartLocation] = useState({
    lat: 1.3513,
    lng: 103.81404,
  });

  const directionsServiceRef = useRef();
  const directionsRendererRef = useRef();
  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    console.log('1. Map Loaded');
    mapRef.current = map;
    const transitLayer = new window.google.maps.TransitLayer();
    const trafficLayer = new window.google.maps.TrafficLayer();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    transitLayer.setMap(mapRef.current);
    trafficLayer.setMap(mapRef.current);
    directionsRenderer.setMap(mapRef.current);
  }, []);

  const onDirectionsServiceLoad = useCallback((directionsService) => {
    console.log('2. Directions Service Loaded');
    directionsServiceRef.current = directionsService;
  }, []);

  const onDirectionsRendererLoad = useCallback((directionsRenderer) => {
    console.log('3. Directions RendererLoaded');
    directionsRendererRef.current = directionsRenderer;
  }, []);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         setUserStartLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //       },
  //       function () {},
  //     );
  //   } else {
  //   }
  // }, []);

  const attachInstructionText = (marker, text) => {
    window.google.maps.event.addListener(marker, 'click', function () {
      const stepDisplay = new window.google.maps.InfoWindow();
      stepDisplay.setContent(text);
      stepDisplay.open(mapRef.current, marker);
    });
  };

  const showSteps = (directionResult) => {
    const userRoute = directionResult.routes[0].legs[0];

    for (let i = 0; i < userRoute.steps.length; i++) {
      const marker = new window.google.maps.Marker({
        position: userRoute.steps[i].start_location,
        map: mapRef.current,
      });
      attachInstructionText(marker, userRoute.steps[i].instructions);
    }
  };

  const calculateRoute = useCallback(
    (selectedPlace) => {
      console.log('Calculating Route');
      console.log(userStartLocation);
      const start = userStartLocation;
      console.log(selectedPlace);
      const end = selectedPlace;
      if (
        !start ||
        !end ||
        typeof start.lat !== 'number' ||
        typeof start.lng !== 'number' ||
        typeof end.lat !== 'number' ||
        typeof end.lng !== 'number'
      ) {
        console.error('Invalid start or end:', start, end);
        return;
      }

      if (directionsServiceRef.current) {
        directionsServiceRef.current.route(
          {
            origin: start,
            destination: end,
            travelMode: 'TRANSIT',
          },
          (result, status) => {
            if (status === 'OK') {
              try {
                if (directionsRendererRef.current) {
                  directionsRendererRef.current.setDirections(result);
                }
                console.log(result);
                const steps = result.routes[0].legs[0].steps;
                console.log(steps);
                if (typeof onDirectionsResult === 'function') {
                  onDirectionsResult(steps);
                  showSteps(result);
                }
              } catch (error) {
                console.error(
                  'Error setting directions or calling onDirectionsResult:',
                  error,
                );
              }
            } else {
              console.error(`Error calculating route: ${status}`);
            }
          },
        );
      }
    },
    [userStartLocation, onDirectionsResult],
  );

  const onMarkerClick = useCallback(
    (position) => {
      console.log('Marker clicked');
      mapRef.current.panTo(position);
      mapRef.current.setZoom(15);
      setSelectedPlace(position);
      calculateRoute(position);
    },
    [calculateRoute],
  );

  const onMapClick = useCallback((event) => {
    console.log('map clicked');
    const lat = event.latLng.lat();
    console.log(lat);
    const lng = event.latLng.lng();
    console.log(lng);
    //function variable to avoid race condition
    const newLocation = {
      lat: lat,
      lng: lng,
    };
    onMarkerClick(newLocation);
    console.log(newLocation);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
      )
      .then((res) => {
        setSelectedPlace(res.data.results[0]);
        sendMessage(
          `You are a world class historian, Associate Professor Joey Long, with expert knowledge on Singapore's every landmark and building, as well as its relevant historical developments. 
          What is the name of the landmark with the following address:${res.data.results[0].formatted_address}. Being as concise, succinct as possible, use different paragraphs and prepend each new paragraph with TAG, followed by sharing its history with Singaporeans, in order to provide them with quality history education. Avoid the use of any of the following symbols ':'`,
        );
      });
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  console.log(selectedPlace);

  return (
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
        {selectedPlace && <Marker position={selectedPlace} />}
        {Object.entries(landmarks).map(([name, position]) => (
          <Marker
            key={name}
            position={position}
            onClick={onMapClick}
            //icon={icon}
            //scaledSize="10%"
          />
        ))}
        <Marker position={selectedPlace} onLoad={() => setMarkerLoaded(true)}>
          {markerLoaded && selectedPlace.lat !== 1.3513 && (
            <InfoWindow>
              <div>
                <h2>{selectedPlace.formatted_address}</h2>
              </div>
            </InfoWindow>
          )}
        </Marker>
        {/* <DirectionsService
          options={{
            origin: userStartLocation,
            destination: selectedPlace,
            travelMode: "TRANSIT",
            transitOptions: {
              modes: ["BUS", "RAIL", "SUBWAY"],
              routingPreference: "FEWER_TRANSFERS",
            },
          }}
          onLoad={onDirectionsServiceLoad}
        />
        <DirectionsRenderer onLoad={onDirectionsRendererLoad} /> */}
      </GoogleMap>
      {/* </LoadScript> */}
    </>
  );
}

export default React.memo(RenderMap);
