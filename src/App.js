// src/App.js

import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faRoute } from '@fortawesome/free-solid-svg-icons';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';

import RoutingMachine from './RoutingMachine';

function App() {
  const [locationMarkers, setLocationMarkers] = useState([]);
  const waypoints = [
    {
      latitude: 51.505,
      longitude: -0.09,
    },
    {
      latitude: 51.467,
      longitude: -0.458,
    },
  ];

  async function handleMarkerSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputLocation = formData.get('location');

    const res = await fetch(
      '/api/geocode?' +
        new URLSearchParams({ location: inputLocation }).toString()
    );
    if (!res.ok) {
      const err = await res.text();
      alert(`Something went wrong.\n${err}`);
    } else {
      const data = await res.json();
      let newLocation = {
        address: data.location,
        lat: data.coordinates.latitude,
        long: data.coordinates.longitude,
      };
      setLocationMarkers((locations) => [...locations, newLocation]);
    }
  }

  return (
    <div className="App">
      <form className="inputBlock" onSubmit={handleMarkerSubmit}>
        <input
          type="text"
          id="location"
          name="location"
          required
          placeholder="Enter location"
        />
        <button type="submit" className="addloc">
          <FontAwesomeIcon icon={faLocationDot} style={{ color: '#1EE2C7' }} />
        </button>
      </form>
      <MapContainer center={[51.505, -0.09]} id="mapId" zoom={13}>
        {locationMarkers.map((loc, key) => {
          return (
            <Marker key={key} position={[loc.lat, loc.long]}>
              <Popup>{loc.address}</Popup>
            </Marker>
          );
        })}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {waypoints ? <RoutingMachine waypoints={waypoints} /> : ''}
      </MapContainer>
    </div>
  );
}

export default App;