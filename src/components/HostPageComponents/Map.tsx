import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

interface MapProps {
    center?: number[];
}

function Map({ center }: MapProps) {
    return (
        <MapContainer
            center={(center as L.LatLngExpression) || [51.505, -0.09]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {center && (
                <Marker position={center as L.LatLngExpression} />
            )}
        </MapContainer>
    );
}

export default Map;