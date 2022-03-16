import { LatLng } from "leaflet";
import React, { useState } from "react";
import { Marker, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";

export const AddMarkersOnMap:React.FC = React.memo(() => {
    const coordinats: LatLng[] = [];
    const [coord, setCoord] = useState(coordinats);
    

    // let map = useMapEvent('click', (e) => {
    //     coord.push(e.latlng);
    //     setCoord(x => [...x, e.latlng])
    // })
    

    return <React.Fragment>
        {coord.map((coor, index) => //key=index
            <Marker key={index} position={coor} icon={L.icon({iconUrl: marker, iconSize:[50,50]})}>
                <Popup>{coor.toString()}</Popup>
            </Marker>
        )}
    </React.Fragment>
})