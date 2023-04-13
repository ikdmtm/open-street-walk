import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMapEvents,
  CircleMarker,
  useMap,
} from "react-leaflet";
import styles from "src/styles/Home.module.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useState } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.ssrc,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = (props) => {
  const position = [35.685, 139.755]; //中心
  const zoom = 11;

  const SetViewOnClick = () => {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });
    return null;
  };

  //現在地にピンを指して中心に移動
  // const LocationMarker = () => {
  //   const [position, setPosition] = useState(null);
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //     },
  //   });
  //
  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // };

  return (
    <MapContainer
      className={styles.map}
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <SetViewOnClick /> */}
      {props.pinsData.length
        ? props.pinsData.map((pin) => {
            return (
              <Marker position={[pin.lat, pin.lng]} key={pin.id}>
                <Popup>
                  <p>{pin.title}</p>
                  <p>{pin.created_at}</p>
                </Popup>
              </Marker>
              // <CircleMarker center={pin} pathOptions={{ fillColor: "blue" }} radius={5}>
              //   <Popup>Popup in CircleMarker</Popup>
              // </CircleMarker>
            );
          })
        : null}
      {/* <LocationMarker /> */}
    </MapContainer>
  );
};

export default Map;
