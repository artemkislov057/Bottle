import { LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";


export const AddMarkersOnMap:React.FC = React.memo(() => {
    const coordinats: LatLng[] = [];
    const [coord, setCoord] = useState(coordinats);
    
    // useMapEvent('click', (e) => {
    //     setCoord([...coord, e.latlng])
    // })
    
    return <React.Fragment>
        {coord.map((coor) =>
            <Marker key={coor.toString()} position={coor} icon={L.icon({iconUrl: marker, iconSize:[50,50]})}>
                <Popup>{coor.toString()}</Popup>
            </Marker>
        )}
    </React.Fragment>
})