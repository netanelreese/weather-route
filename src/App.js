
import './App.css';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';

function App() {
  const position = [35.467, -97.505];
  return (
    <div className="App">
      <MapContainer center={[35.466, -97.5]} id="mapId" zoom={13}>
      <Marker position={position}>
          <Popup>Hello World</Popup>
        </Marker>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}

export default App;