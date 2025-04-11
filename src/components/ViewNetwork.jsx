import React, { useEffect, useState } from 'react';
import { ref, get, child } from 'firebase/database';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ViewNetwork = () => {
  const [alumniList, setAlumniList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumni = async () => {
      const snapshot = await get(child(ref(db), 'alumni'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const alumniArray = Object.keys(data).map((key) => ({
          uid: key,
          ...data[key],
        }));
        setAlumniList(alumniArray);
      }
    };

    fetchAlumni();
  }, []);

  const avatarIcon = (seed) =>
    L.icon({
      iconUrl: `https://api.dicebear.com/6.x/initials/png?seed=${seed}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

  return (
    <div className="h-screen">
      <MapContainer center={[20.5937, 78.9629]} zoom={4} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {alumniList.map((alum, idx) => {
          const { latitude, longitude, name, email, city, country } = alum;
          const seed = name || email;

          if (latitude && longitude) {
            return (
              <Marker
                key={idx}
                position={[latitude, longitude]}
                icon={avatarIcon(seed)}
                eventHandlers={{
                  click: () => {
                    navigate('/dashboard', {
                      state: { userData: alum, email: email }
                    });
                  }
                }}
              >
                <Popup>
                  <strong>{name}</strong>
                  <br />
                  {city}, {country}
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default ViewNetwork;
