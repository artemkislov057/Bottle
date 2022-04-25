import { LatLng, LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";
import { WsDialogType } from "../../WsDialogType";

import commercMarker from './markerIcons/markerCommercIcon.svg';
import hangMarker from './markerIcons/markerHangIcon.svg';
import otherMarker from './markerIcons/markerOtherIcon.svg';
import sportMarker from './markerIcons/markerSportIcon.svg';
import acquainMarker from './markerIcons/markerAcquaintanceIcon.svg';

import { ContextForSearch } from "../../contextForSearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { DataBottleDescType } from "../../DataBottleDescriptType";
import { UserInfoType } from '../../UserInfoType';
import { BottleRequestType } from "../../BottleRequestType";


 

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

    const {data, bottlesOnMap, setData, openDescriptionBar, openEditRightBar} = useContext(ContextForCreateBottleMarker); //информация бутылки, которая будет создана
    const [currentBottles, setCurrentBottles] = useState([{coordinates: new LatLng(null, null), data: data}]); //созданные бутылки
    const [selfId, setSelfId] = useState('-1');
    
    let initObj : DataBottleDescType = {
        titleName:'',
        address:'',
        content: null,
        countPick:0,
        description: null,
        timeLife:0,
        bottleId: -1,
        category: 'Все категории'
    }

    const markerIcons: Map<string, string> = new Map();
    markerIcons.set('Продажи', commercMarker);
    markerIcons.set('Тусовки', hangMarker);
    markerIcons.set('Знакомства', acquainMarker);
    markerIcons.set('Спорт', sportMarker);
    markerIcons.set('Прочее', otherMarker);
    markerIcons.set('Все категории', otherMarker);

        
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
        // console.log(data)
        if(data?.titleName) {
            map.on('click', async (e : LeafletMouseEvent) => {
                let provider = new OpenStreetMapProvider();

                let pos = e.latlng;
                let addressPlace = await provider.search({query:`${pos.lat}, ${pos.lng}`});
                // setCurrentBottles([...currentBottles, {coordinates:pos, data: {...data, address:addressPlace[0].label}}])
                // console.log(addressPlace[0].label);

                map.removeEventListener('click');

                // console.log(data);
                let responseCreate = await fetch('https://localhost:44358/api/bottles', {
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
                        contentItemsCount: data.content?.length,
                    }),
                    credentials: 'include',
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                let bottleData = await responseCreate.json() as BottleRequestType;                
                // console.log(bottleData)
                if(data.content) {
                    for (let urlPhoto of data.content) {
                        // console.log(urlPhoto)
                        let formData = new FormData();
                        //@ts-ignore
                        formData.append('file', urlPhoto);
    
                        await fetch(`https://localhost:44358/api/bottles/${bottleData.id}/content`, {
                            method: 'POST',
                            body: formData,
                            credentials: "include",                           
                        });
                    }
                }                

                setData(initObj);
            })            
        }
    }, [data]);

    useEffect(() => {
        async function getSelfInfo() {
            let response = await fetch('https://localhost:44358/api/account', {
                credentials: "include"
            });
            let info = await response.json() as UserInfoType;
            setSelfId(info.id);
        }

        getSelfInfo();
    }, [])


    // useEffect(() => {// при обновлении стр
    //     setCurrentBottles(bottlesOnMap);
    //     return () => setCurrentBottles([{coordinates: new LatLng(null, null), data: data}])        
    // }, [bottlesOnMap]);
    
    //icon={L.icon({iconUrl: marker, iconSize:[50,50]})}
    return <React.Fragment>                   
        {searchResultMarker}
        {bottlesOnMap.map(marker => {            
                if(marker.data?.title) {
                    return <Marker 
                        key={marker.coordinates.toString()} 
                        position={marker.coordinates} 
                        eventHandlers={{click: (e) => {
                                if(selfId === marker.data.userId) {                                    
                                    openDescriptionBar(marker?.data, openEditRightBar)
                                } else {
                                    openDescriptionBar(marker?.data)
                                }
                            } 
                        }}
                        icon={L.icon({iconUrl: markerIcons.get(marker.data.category), iconSize:[50,50]})}
                        />
                }
                    
                return null;
            }
        )}
    </React.Fragment>
})