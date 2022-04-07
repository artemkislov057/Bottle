import { latLng, LatLng, LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";

import { ContextForSearch } from "../../contextForSearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";

type TProps = {
    address: string,
    latLng: L.LatLng
    // x: number,
    // y: number
}

type FuckTs = {
    latLng: L.LatLng,
    data: {}
}

export const AddMarkersOnMap:React.FC = React.memo((props) => {
    const coordinats: LatLng[] = [];
    const coor: LatLng = null;
    let temp : FuckTs = {
        latLng: new LatLng(0,0),
        data: {}

    }
    // const [coord, setCoord] = useState(coordinats);//просто маркеры при нажатии
    const [coord, setCoord] = useState([temp]);//просто маркеры при нажатии
    const [latLngForSearch] = useContext(ContextForSearch);//координаты при поиске
    const [searchResultMarker, setSearchMarker] = useState(<></>);//маркер при поиске
    const {data, setData, openDescriptionBar} = useContext(ContextForCreateBottleMarker);    

    const [currentBottles, setCurrentBottles] = useState([{coordinates: new LatLng(null, null), data: data}]);
    // useMapEvent('click', (e) => {
    //     setCoord([...coord, e.latlng])
    // })
    
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
    useEffect(() => {
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

    useEffect(() => {
        if(data.titleName !== '') {
            let b = map.on('click', (e : LeafletMouseEvent) => {
                let provider = new OpenStreetMapProvider();

                let pos = e.latlng;
                provider.search({query:`${pos.lat}, ${pos.lng}`}).then(res => {
                    // <this> send request on api
                    // setData({...data, address: res[0].label});
                    setCurrentBottles([...currentBottles, {coordinates:pos, data: {...data, address:res[0].label}}])                    
                    console.log(res[0].label);
                    map.removeEventListener('click');                    
                });
            })            
        }
    }, [data])

    // useEffect(() => {
        
    // }, [data])


    let tempData1 = {
        titleName:'Oh fuck, is test',
        address:'блюffff',
        content:[''],
        countPick:2,
        description:'Описание описание описание',
        timeLife:10
    }

    let tempData2 = {
        titleName:'Oh fuck, is test number 2',
        address:'мира 32',
        content:[marker],
        countPick:2,
        description:'Описание описание описание',
        timeLife:10
    }

    //icon={L.icon({iconUrl: marker, iconSize:[50,50]})}
    return <React.Fragment>
        {/* {coord.map((coor) =>
            <Marker eventHandlers={{click: (e) => null}} key={coor.toString()} position={coor} >
                <Popup>{coor.toString()}</Popup>
            </Marker>
        )} */}
        {coord.map((coor, index) => 
            <Marker eventHandlers={{click: (e) => 
                //@ts-ignore
                openDescriptionBar(coor.data)}} key={coor.latLng.toString()} 
                    position={coor.latLng} >
                {/* <Popup>{coor.latLng.toString()}</Popup> */}
            </Marker>
        )}        
        {searchResultMarker}
        {currentBottles.map(marker => 
            <Marker key={marker.coordinates.toString()} position={marker.coordinates} eventHandlers={{click: () => openDescriptionBar(marker.data)}} />
            )}
    </React.Fragment>
})