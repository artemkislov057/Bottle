// import { ws } from "components/connections/ws";
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
    }[]>>,
    constBotMap: {
        data: BottleRequestType;
        coordinates: LatLng;
    }[],
    setConstBottle:React.Dispatch<React.SetStateAction<{
        data: BottleRequestType;
        coordinates: LatLng;
    }[]>>,
    currentCategory: string
}

export const wsBottle = (bottlesData : data, e: MessageEvent<any>) => {    
    // ws.onmessage = (e) => {
        if(!e) return
        console.log(e)
        let data = JSON.parse(e.data) as WsDataType;
        let info = data.model;
        if(data.eventNumber === 3) {
            // let currentBottleData: BottleRequestType = {
            //     active: info.active,
            //     contentIds: info.contentIds,
            //     contentItemsCount: info.contentItemsCount,
            //     created: info.created,
            //     endTime: info.endTime,
            //     geoObjectName: info.geoObjectName,
            //     id: info.id,
            //     isContentLoaded: info.isContentLoaded,
            //     lat: info.lat,
            //     lifeTime: info.lifeTime,
            //     lng: info.lng,
            //     maxPickingUp: info.maxPickingUp,
            //     pickingUp: info.pickingUp,
            //     title: info.title,
            //     userId: info.userId,
            //     address: info.address,
            //     category: info.category,
            //     description: info.description
            // }
            // let coord = new LatLng(data.model.lat, data.model.lng);
            // let newBottle = {coordinates: coord, data: currentBottleData};
            let newBottle = createBottleObject(data);
            if(!bottlesData.bottleOnMap.includes(newBottle)) {
                console.log('yes')
                if(bottlesData.currentCategory === newBottle.data.category || bottlesData.currentCategory === 'Все категории')
                    bottlesData.setBotMap([...bottlesData.bottleOnMap, newBottle]);
                bottlesData.setConstBottle([...bottlesData.constBotMap, newBottle]);
            }
            
        }
        if(data.eventNumber === 7) {            
            let oldBottle = bottlesData.bottleOnMap.filter(bottle => bottle.data.id === data.model.id)[0];
            let indexBotMap = bottlesData.bottleOnMap.indexOf(oldBottle);
            console.log(bottlesData.bottleOnMap);
            console.log(indexBotMap)
            let tempBotMap = bottlesData.bottleOnMap.slice();
            tempBotMap.splice(indexBotMap, 1);
            console.log(tempBotMap);

            let indexConstBottle = bottlesData.constBotMap.indexOf(oldBottle);
            let tempConstBottle = bottlesData.bottleOnMap.slice();
            tempConstBottle.splice(indexConstBottle, 1)

            // bottlesData.setBotMap(tempBotMap);
            // bottlesData.setConstBottle(tempConstBottle);

            let newBottle = createBottleObject(data);
            if(bottlesData.currentCategory === newBottle.data.category || bottlesData.currentCategory === 'Все категории')
                    bottlesData.setBotMap([...tempBotMap, newBottle]);
                bottlesData.setConstBottle([...tempConstBottle, newBottle]);
        }

        if(data.eventNumber === 5 || data.eventNumber === 6 || data.eventNumber === 9) {
            let deleteIndex = -1;
            bottlesData.bottleOnMap.forEach((e, index) => {
                if(e.data?.id === data.model?.id || (data.model?.bottleId && e.data?.id === data.model?.bottleId)) {
                    deleteIndex = index;
                    return;
                }                
            });
            if(deleteIndex !== -1) {
                let tempBottles = bottlesData.bottleOnMap.slice();
                tempBottles.splice(deleteIndex, 1);
                bottlesData.setBotMap(tempBottles);    
            }            

            deleteIndex = -1;
            bottlesData.constBotMap.forEach((e, index) => {
                if(e.data?.id === data.model?.id || (data.model?.bottleId && e.data?.id === data.model?.bottleId)) {
                    deleteIndex = index;
                    return;
                }
            });
            if(deleteIndex === -1) return;
            let tempBottles = bottlesData.constBotMap.slice();
            tempBottles.splice(deleteIndex, 1);
            bottlesData.setConstBottle(tempBottles);
        }

        function createBottleObject(data: WsDataType) {
            let info = data.model;
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
            return newBottle;
        }
    // }
}