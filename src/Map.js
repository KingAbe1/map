import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: 'marker-icon.png', // Replace with the path to your custom marker icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    
    // Fetch the locations from the API
    fetch('https://alhusengeneralimportandexport.com/api/shop/getAll')
      .then((response) => response.json())
      .then((data) => setLocations(data.shops))
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '910px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={customIcon}
        >
          <Popup>{location.shopName}</Popup>
        </Marker>
      ))}
    </MapContainer>

    
  );
}

export default Map;