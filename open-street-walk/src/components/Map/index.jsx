import dynamic from "next/dynamic";
// import React from "react";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

export default Map;
