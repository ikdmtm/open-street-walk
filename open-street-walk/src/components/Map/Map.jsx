import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, CircleMarker } from "react-leaflet";
import styles from "src/styles/Home.module.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.ssrc,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = (props) => {
  const position = [35.5623, 139.7151];

  const SetViewOnClick = () => {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });
    return null;
  };

  return (
    <MapContainer className={styles.map} center={position} zoom={17} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewOnClick />
      {props.pins.length
        ? props.pins.map((pin) => {
            return (
              <Marker position={pin} key={pin[0]}>
                <Popup>
                  {pin[0]}, {pin[1]}
                </Popup>
              </Marker>
              // <CircleMarker center={pin} pathOptions={{ fillColor: "blue" }} radius={5}>
              //   <Popup>Popup in CircleMarker</Popup>
              // </CircleMarker>
            );
          })
        : null}
    </MapContainer>
  );
};

export default Map;
