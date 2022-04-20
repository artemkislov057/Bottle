import { ws } from "components/connections/ws"
import { WsDataType } from "components/pages/MainPage/WsDataType";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import { LatLng } from "leaflet";
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";

type data = {
    bottleOnMap: {
        data: BottleRequestType;
        coordinates: LatLng;
    }[],
    setBotMap: React.Dispatch<React.SetStateAction<{
        data: BottleRequestType;
        coordinates: LatLng;
    }[]>>
}

export const wsOnCreateBottle = (bottlesData : data, e: MessageEvent<any>) => {    
    // ws.onmessage = (e) => {
        if(!e) return
        console.log(e)
        let data = JSON.parse(e.data) as WsDataType;
        let info = data.model;
        if(data.eventNumber === 3) {
            let currentBottleData: BottleRequestType = {
                active: info.active,
                contentIds: info.contentIds,
                contentItemsCount: info.contentItemsCount,
                created: info.created,
                endTime: info.endTime,
                geoObjectName: info.geoObjectName,
                id: info.id,
                isContentLoaded: info.isContentLoaded,
                lat: info.lat,
                lifeTime: info.lifeTime,
                lng: info.lng,
                maxPickingUp: info.maxPickingUp,
                pickingUp: info.pickingUp,
                title: info.title,
                userId: info.userId,
                address: info.address,
                category: info.category,
                description: info.description
            }
            let coord = new LatLng(data.model.lat, data.model.lng);
            let newBottle = {coordinates: coord, data: currentBottleData}
            if(!bottlesData.bottleOnMap.includes(newBottle)) {
                console.log('yes')
                bottlesData.setBotMap([...bottlesData.bottleOnMap, newBottle])
            }
            
        }
    // }
}