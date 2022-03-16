import React, { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet';
import './mapStyle.css';
import L from "leaflet";
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import marker from '../../../../marker_siniy.svg';

export const MapMainPage:React.FC = React.memo(() => {
    // useEffect(() => {        
    //     map = L.map('mapid').setView([56.85, 60.6], 13);
    //     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //         //описание авторских прав и тп
    //         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            
    //         maxZoom: 18,
    //         id: 'mapbox/streets-v11',
    //         tileSize: 512,
    //         zoomOffset: -1,
    //         //токен, сейчас общедоступный
    //         accessToken: 'pk.eyJ1IjoiZGltYXNpa2J1cmRpbiIsImEiOiJja3VyNm5vNzEwb2N1Mm5xdnVmY2F2NmZkIn0.m48LWgVP-vrcXmP0r-oiBQ'
    //     }).addTo(map);
    // })
    
    return <MapContainer center={[56.85, 60.6]} zoom={13} >
        <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
            accessToken='pk.eyJ1IjoiZGltYXNpa2J1cmRpbiIsImEiOiJja3VyNm5vNzEwb2N1Mm5xdnVmY2F2NmZkIn0.m48LWgVP-vrcXmP0r-oiBQ'
        />
        <Marker position={[56.85, 60.6]} icon={L.icon({iconUrl: marker, iconSize:[50,50]})}></Marker>
    </MapContainer>
})