"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"; // Adicionar compatibilidade
import "leaflet-defaulticon-compatibility"; // Importa e ativa a compatibilidade automaticamente
import Link from "next/link";
import { PostWithProfile } from "@/app/types";

interface MapWithMarkerProps {
  posts: PostWithProfile | PostWithProfile[];
}

const MapWithMarker: React.FC<MapWithMarkerProps> = ({ posts }) => {
  const normalizedPosts = Array.isArray(posts) ? posts : [posts];

  return (
    <div className="mt-8">
      <MapContainer
        center={
          normalizedPosts.length > 0
            ? [normalizedPosts[0].latitude, normalizedPosts[0].longitude]
            : [0, 0]
        }
        zoom={13}
        className="h-[300px] w-full mt-4 rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {normalizedPosts.map((post) => (
          <Marker key={post.id} position={[post.latitude, post.longitude]}>
            <Popup>
              <Link href={`/post/${post.id}/${post.profile.user_id}`}>
                <video 
                  id={`video${post.id}`}
                  src={post.video_url}
                  muted
                  loop
                  className="aspect-[3/4] object-cover rounded-md"
                />
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapWithMarker;
