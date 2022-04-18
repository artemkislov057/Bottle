import { LatLng, LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";

import { ContextForSearch } from "../../contextForSearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";

type TProps = {
    address: string,
    latLng: L.LatLng    
}

type FuckTs = {
    latLng: L.LatLng,
    data: {}
}

export const AddMarkersOnMap:React.FC = React.memo((props) => {
    let temp : FuckTs = {
        latLng: new LatLng(0,0),
        data: {}
    }
    const [coord, setCoord] = useState([temp]);//просто маркеры при нажатии

    const [latLngForSearch] = useContext(ContextForSearch);//координаты при поиске
    const [searchResultMarker, setSearchMarker] = useState(<></>);//маркер при поиске

    const {data, bottlesOnMap, setData, openDescriptionBar} = useContext(ContextForCreateBottleMarker); //информация бутылки, которая будет создана
    const [currentBottles, setCurrentBottles] = useState([{coordinates: new LatLng(null, null), data: data}]); //созданные бутылки
        
    // useMapEvent('click', (e) => {
    //     if(coord.length < 2) {
    //         console.log('first')
    //         setCoord([...coord, {latLng: e.latlng, data:tempData1}])
    //     } else {
    //         console.log('second')
    //         setCoord([...coord, {latLng: e.latlng, data:tempData2}])
    //     }
    // })

    let map = useMap();

    useEffect(() => { // ставит маркер при поиске по адресу
        if(latLngForSearch.lat !== 0 && latLngForSearch.lng !== 0) {
            // setCoord([...coord, latLngForSearch])
            map.setView(latLngForSearch);
            setSearchMarker(
                <Marker position={latLngForSearch}>
                    <Popup>{latLngForSearch.toString()}</Popup>
                </Marker>);            
        }
        // return () => setSearchMarker(<></>);
    }, [latLngForSearch])

    useEffect(() => { // создание бутылки
        if(data.titleName !== '') {
            map.on('click', async (e : LeafletMouseEvent) => {
                let provider = new OpenStreetMapProvider();

                let pos = e.latlng;
                let addressPlace = await provider.search({query:`${pos.lat}, ${pos.lng}`});
                // setCurrentBottles([...currentBottles, {coordinates:pos, data: {...data, address:addressPlace[0].label}}])
                console.log(addressPlace[0].label);

                map.removeEventListener('click');

                fetch('https://localhost:44358/api/bottles', {
                    method: 'POST',
                    body: JSON.stringify({
                        lat: pos.lat,
                        lng: pos.lng,
                        title: data.titleName,                
                        geoObjectName: null,
                        address: addressPlace[0].label,
                        description: data.description,
                        category: data.category,//
                        lifeTime: data.timeLife,
                        maxPickingUp: data.countPick,
                        contentItemsCount: data.content?.length || 0,
                    }),
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            })            
        }
    }, [data])

    // useEffect(() => {// при обновлении стр
    //     setCurrentBottles(bottlesOnMap);
    //     return () => setCurrentBottles([{coordinates: new LatLng(null, null), data: data}])        
    // }, [bottlesOnMap]);
    
    //icon={L.icon({iconUrl: marker, iconSize:[50,50]})}
    return <React.Fragment>                   
        {searchResultMarker}
        {bottlesOnMap.map(marker => {            
            if(marker.data.titleName !== '')
                return <Marker key={marker.coordinates.toString()} position={marker.coordinates} eventHandlers={{click: (e) => {openDescriptionBar(marker.data)} } } />
            }
        )}
    </React.Fragment>
})