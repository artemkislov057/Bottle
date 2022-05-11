import { LatLng, LeafletMouseEvent } from "leaflet";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import marker from '../../../../../marker_siniy.svg';
import L from 'leaflet';
import { Popup } from "react-leaflet";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";
import { WsDialogType } from "../../WsDialogType";
import { apiUrl } from "components/connections/apiUrl";

import commercMarker from './markerIcons/markerCommercIcon.svg';
import hangMarker from './markerIcons/markerHangIcon.svg';
import otherMarker from './markerIcons/markerOtherIcon.svg';
import sportMarker from './markerIcons/markerSportIcon.svg';
import acquainMarker from './markerIcons/markerAcquaintanceIcon.svg';

import { MapModal } from "../questModal/questModal";
import { ContextForSearch } from "../../contextForSearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { DataBottleDescType } from "../../DataBottleDescriptType";
import { UserInfoType } from '../../UserInfoType';
import { BottleRequestType } from "../../BottleRequestType";
import { CurrentCoordinationsContext } from "../../changeCoordinationContext";


 

type TProps = {
    setQuestModal: React.Dispatch<React.SetStateAction<JSX.Element>> 
}

type FuckTs = {
    latLng: L.LatLng,
    data: {}
}

type searchMarkerType = {
    children: any,
    position: LatLng
}

export const AddMarkersOnMap:React.FC<TProps> = React.memo((props) => {
    let temp : FuckTs = {
        latLng: new LatLng(0,0),
        data: {}
    }
    const [coord, setCoord] = useState([temp]);//просто маркеры при нажатии

    const [latLngForSearch] = useContext(ContextForSearch);//координаты при поиске
    const [searchResultMarker, setSearchMarker] = useState(<></>);//маркер при поиске

    const {data, bottlesOnMap, setData, openDescriptionBar, openEditRightBar, startCreateMode, exitCreateMode} = useContext(ContextForCreateBottleMarker); //информация бутылки, которая будет создана
    const {currentLatLng, changeCoord} = useContext(CurrentCoordinationsContext);
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

    let map = useMap();

    let onDragEnd = () => {
        console.log(map.getCenter());
        let latlng = map.getCenter();
        changeCoord(latlng.lat, latlng.lng);
        map.removeEventListener('dragend');
        map.on('dragend', onDragEnd);
    }

    map.on('dragend', onDragEnd)    



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
    }, [latLngForSearch]);

    useEffect(() => {
        let markerProps = searchResultMarker.props as searchMarkerType;
        if(!markerProps.position) return
        
        map.on('click', () => {
            console.log(10)
            setSearchMarker(<></>);
            map.removeEventListener('click')
        });        
    }, [searchResultMarker])

    useEffect(() => { // создание бутылки
        // console.log(data)
        if(data?.titleName) {
            let currentData = data;
            startCreateMode(currentData, map);
            map.on('click', async (e : LeafletMouseEvent) => {                
                let provider = new OpenStreetMapProvider();
                let pos = e.latlng;
                let addressPlace = await provider.search({query:`${pos.lat}, ${pos.lng}`});
                let localAddress = addressPlace[0].label.split(',').slice(0,2).toString();

                let onClickYes = () => onClickYesCreateButton(currentData, pos, addressPlace[0].label);
                for(let e of bottlesOnMap) {
                    if(e.data?.id === data.bottleId) {
                        onClickYes = () => onClickYesChangeCoordinates(e.data.id, pos, addressPlace[0].label);
                    }
                }


                props.setQuestModal(<MapModal 
                        quest={`Вы точно хотите поставить бутылку по адресу: ${localAddress}?`}
                        onClickNoButton={onClickNoCreateButton} 
                        onClickYesButton={onClickYes} 
                    />);
            })
        }
    }, [data]);

    useEffect(() => {
        async function getSelfInfo() {
            let response = await fetch(`${apiUrl}/api/account`, {
                credentials: "include"
            });
            let info = await response.json() as UserInfoType;
            setSelfId(info.id);
        }

        getSelfInfo();
    }, []);

    function onClickYesCreateButton(data: DataBottleDescType, locate: LatLng, address: string) {
        map.removeEventListener('click');
        props.setQuestModal(<></>);
        exitCreateMode();
        sendCreateBottleRequest(data, locate, address);
    }

    function onClickNoCreateButton() {
        props.setQuestModal(<></>);
    }

    function onClickYesChangeCoordinates(id: number, coordinates: LatLng, address: string) {
        map.removeEventListener('click');
        props.setQuestModal(<></>);
        exitCreateMode();
        console.log('change');
        changeLocate(id, coordinates, address)
    }

    async function changeLocate(id: number, coordinates: LatLng, address: string) {
        let response = await fetch(`${apiUrl}/api/bottles/${id}/change-coordinates`, {
            method: 'POST',
            body: JSON.stringify({
                lat: coordinates.lat,
                lng: coordinates.lng,
                address: address
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });

        setData(initObj);
    }

    async function sendCreateBottleRequest(requestdata: DataBottleDescType, pos: LatLng, address: string) {
        let responseCreate = await fetch(`${apiUrl}/api/bottles`, {
            method: 'POST',
            body: JSON.stringify({
                lat: pos.lat,
                lng: pos.lng,
                title: requestdata.titleName,                
                geoObjectName: null,//
                address: address,
                description: requestdata.description,
                category: requestdata.category,//
                lifeTime: requestdata.timeLife,
                maxPickingUp: requestdata.countPick,
                contentItemsCount: requestdata.content?.length,
            }),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json'
            }
        });
        
        if(requestdata.content) {
            let bottleData = await responseCreate.json() as BottleRequestType;                
            console.log(bottleData)
            for (let urlPhoto of data.content) {
                // console.log(urlPhoto)
                let formData = new FormData();
                formData.append('file', urlPhoto);

                await fetch(`${apiUrl}/api/bottles/${bottleData.id}/content`, {
                    method: 'POST',
                    body: formData,
                    credentials: "include",                           
                });
            }
        }

        setData(initObj);
    }

    
    // useEffect(() => {// при обновлении стр
    //     setCurrentBottles(bottlesOnMap);
    //     return () => setCurrentBottles([{coordinates: new LatLng(null, null), data: data}])        
    // }, [bottlesOnMap]);
    
    //icon={L.icon({iconUrl: marker, iconSize:[50,50]})}
    return <React.Fragment>        
        {searchResultMarker}
        {            
            bottlesOnMap.map(marker => {            
                    if(marker.data?.title) {
                        // console.log(marker)
                        // console.log(bottlesOnMap)
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
            })
        }
    </React.Fragment>
})