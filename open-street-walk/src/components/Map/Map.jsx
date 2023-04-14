import styles from "src/components/Map/Map.module.css";
import Image from "next/image";
import { format } from "date-fns";
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

  const formatFunction = (time) => {
    const createdAt = new Date(time);
    const formattedCreatedAt = format(createdAt, "yyyy-MM-dd  HH:mm");
    return formattedCreatedAt;
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

  const clickMarker = () => {
    return <p>test</p>;
  };

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
      {props.pinsData.pins.length
        ? props.pinsData.pins.map((pin) => {
            return (
              <Marker position={[pin.lat, pin.lng]} key={pin.id}>
                <Popup>
                  <p className={styles.title}>{pin.title}</p>
                  {props.pinsData.pin_urls[pin.id - 1] ? (
                    <div className={styles.image}>
                      <Image
                        src={props.pinsData.pin_urls[pin.id - 1]}
                        alt="画像"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  ) : null}
                  <p className={styles.description}>
                    {pin.lat}
                    {",   "}
                    {pin.lng}
                    <br />
                    {formatFunction(pin.created_at)}
                  </p>
                </Popup>
              </Marker>
            );
          })
        : null}
      {/* <LocationMarker /> */}
    </MapContainer>
  );
};

export default Map;
