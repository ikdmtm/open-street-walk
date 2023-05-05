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
import { useState, useRef } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.ssrc,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = (props) => {
  const [position, setPosition] = useState([35.685, 139.755]); //中心
  const zoom = 11;

  const SetViewOnClick = () => {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      });
    });
    return null;
  };

  const CurrentPosition = () => {
    const map = useMap();
    //現在地を取得
    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            map.flyTo(
              [position.coords.latitude, position.coords.longitude],
              17
            );
          },
          () => {
            alert("現在地の取得に失敗しました");
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    };

    return (
      <div className="leaflet-top leaflet-right">
        <div className="leaflet-control leaflet-bar">
          <span onClick={getPosition} className={styles.button}>
            現在地周辺に移動
          </span>
        </div>
      </div>
    );
  };

  const formatFunction = (time) => {
    const createdAt = new Date(time);
    const formattedCreatedAt = format(createdAt, "yyyy-MM-dd  HH:mm");
    return formattedCreatedAt;
  };

  // クリックした場所にピンを作成;
  // const HandleClickMap = () => {
  //   const map = useMapEvents({
  //     click(e) {
  //       console.log(e.latlng);
  //       setPosition(e.latlng);
  //       // map.flyTo(e.latlng, 17);
  //     },
  //   });
  //   return position && position.lat && position.lng ? (
  //     <Marker position={position}>
  //       <Popup>
  //         <p>
  //           クリックした場所の緯度経度
  //           <br />
  //           {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
  //         </p>
  //       </Popup>
  //     </Marker>
  //   ) : null;
  // };

  //現在地にピンを指して中心に移動
  // const LocationMarker = () => {
  //   const [clickPosition, setClickPosition] = useState(null);
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       setClickPosition(e.latlng);
  //       map.flyTo(e.latlng, 17);
  //     },
  //   });

  //   return position === null ? null : (
  //     <Marker position={ClickPosition}>
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
      {props.pinsData && props.pinsData.pins && props.pinsData.pins.length
        ? props.pinsData.pins.map((pin) => {
            return (
              <Marker position={[pin.lat, pin.lng]} key={pin.id}>
                <Popup>
                  <p className={styles.title}>{pin.title}</p>
                  {props.pinsData.pin_urls[pin.id - 1] ? (
                    <div className={styles.image}>
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_API_URL +
                          props.pinsData.pin_urls[pin.id - 1]
                        }
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
      {/* <SetViewOnClick /> */}
      {/* <LocationMarker /> */}
      {/* <HandleClickMap /> */}
      <CurrentPosition />
    </MapContainer>
  );
};

export default Map;
