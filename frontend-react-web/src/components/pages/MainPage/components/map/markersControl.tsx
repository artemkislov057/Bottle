import { latLng, LatLng } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";

import { ContextForSearch } from "../../contextForSearch";

type TProps = {
    address: string,
    latLng: L.LatLng
    // x: number,
    // y: number
}

export const AddMarkersOnMap:React.FC = React.memo((props) => {
    const coordinats: LatLng[] = [];
    const [coord, setCoord] = useState(coordinats);

    const [latLngForSearch] = useContext(ContextForSearch);

    const [searchResultMarker, setSearchMarker] = useState(<></>);

    // useMapEvent('click', (e) => {
    //     setCoord([...coord, e.latlng])
    // })

    let map = useMap();
    useEffect(() => {
        if(latLngForSearch.lat !== 0 && latLngForSearch.lng !== 0) {
            // setCoord([...coord, latLngForSearch])
            map.setView(latLngForSearch);
            setSearchMarker(
                <Marker position={latLngForSearch}>
                    <Popup>aaa</Popup>
                </Marker>);            
        }
        // return () => setSearchMarker(<></>);
    }, [latLngForSearch])

    //icon={L.icon({iconUrl: marker, iconSize:[50,50]})}
    return <React.Fragment>
        {coord.map((coor) =>
            <Marker eventHandlers={{click: (e) => console.log(e)}} key={coor.toString()} position={coor} >
                <Popup>{coor.toString()}</Popup>
            </Marker>
        )}
        {searchResultMarker}
    </React.Fragment>
})