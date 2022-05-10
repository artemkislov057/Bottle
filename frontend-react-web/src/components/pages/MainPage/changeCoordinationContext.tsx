import { LatLng } from "leaflet";
import React from "react";

let initLatLng: LatLng

export const CurrentCoordinationsContext = React.createContext({
    currentLatLng: initLatLng,
    changeCoord: (lat: number, lng: number) => {return}
})