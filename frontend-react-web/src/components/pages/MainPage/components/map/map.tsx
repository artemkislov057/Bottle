import React, { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet';
import './mapStyle.css';
import L from "leaflet";
import {MapContainer, TileLayer, Marker, ZoomControl, LayersControl, useMap} from 'react-leaflet';
import marker from '../../../../../marker_siniy.svg';
import { AddMarkersOnMap } from "./markersControl";
import { GeoJSON } from "react-leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';


export const MapMainPage:React.FC = React.memo((props) => {  
    
    return <MapContainer center={[56.85, 60.6]} zoom={13} zoomControl={false} >        
        <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
            accessToken='pk.eyJ1IjoiZGltYXNpa2J1cmRpbiIsImEiOiJja3VyNm5vNzEwb2N1Mm5xdnVmY2F2NmZkIn0.m48LWgVP-vrcXmP0r-oiBQ'
        />
        <ZoomControl position="bottomright"></ZoomControl>
        <AddMarkersOnMap ></AddMarkersOnMap>
        {/* {props.children} */}
    </MapContainer>
    
})