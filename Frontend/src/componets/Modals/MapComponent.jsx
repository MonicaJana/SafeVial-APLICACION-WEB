import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = ({ onLocationSelect, onClose }) => {
  const [center, setCenter] = useState({ lat: -0.22985, lng: -78.52495 }); // Coordenadas de Quito

  const mapStyles = {
    height: "600px",  // Ajusta el tamaño del mapa
    width: "600px"
  };

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const latlng = { lat, lng };

    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        // Obtener solo el formatted_address del primer resultado
        const locationName = results[0].formatted_address;

        onLocationSelect(locationName); // Envía el nombre de la ubicación
      } else {
        // Si no hay resultados, envía las coordenadas
        onLocationSelect(`Coordenadas: ${lat}, ${lng}`);
      }
    });

    setCenter({ lat, lng });
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              padding: '5px 10px',
              cursor: 'pointer',
              zIndex: 1000
            }}
          >
            Cerrar
          </button>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={center}
            onClick={handleMapClick}
          />
        </div>
      </LoadScript>
    </div>
  );
}

export default MapComponent;
