// MapSection.tsx

"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";

interface LatLng {
  lat: number;
  lng: number;
}

type MapSectionProps = {
  address: string;
  location: L.LatLng | null;
  setAddress: (address: string) => void;
  setLocation: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
  fetchLatLngFromAddress: () => Promise<void>;
};

const LocationMarker: React.FC<{ setLocation: (location: L.LatLng | null) => void }> = ({ setLocation }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;
      setPosition(clickedLatLng);
      setLocation(clickedLatLng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Localização selecionada</Popup>
    </Marker>
  );
};

const MapSection: React.FC<MapSectionProps> = ({
  location,
  setLocation,
  address,
  setAddress,
  fetchLatLngFromAddress,
}) => {
  const [userLatLng, setUserLatLng] = useState<L.LatLng | null>(null);
  const mapRef = useRef<any>(null); // Ref para o MapContainer

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLatLng = L.latLng(latitude, longitude);
        setUserLatLng(currentLatLng);
        setLocation(currentLatLng);

        // Atualiza o mapa para centralizar na localização do usuário
        if (mapRef.current) {
          mapRef.current.setView(currentLatLng, mapRef.current.getZoom());
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-[15px] font-semibold">Mapa</h3>
      
      <MapContainer
        zoomAnimation
        scrollWheelZoom={false}
        center={location || { lat: -23.55052, lng: -46.633308 }}
        zoom={13}
        className="h-[300px] w-full mt-4 rounded-lg"
        ref={mapRef} // Passa a referência do mapa
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <LocationMarker setLocation={setLocation} />
        {userLatLng && (
          <Marker position={userLatLng}>
            <Popup>Sua localização atual</Popup>
          </Marker>
        )}
      </MapContainer>
      <Button
        variant={"outline"}
        onClick={handleUseCurrentLocation}
        className="mt-4 p-2"
      >
        Usar Localização Atual
      </Button>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Latitude</label>
        <input
          type="text"
          value={location?.lat || ""}
          readOnly
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Longitude</label>
        <input
          type="text"
          value={location?.lng || ""}
          readOnly
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default MapSection;