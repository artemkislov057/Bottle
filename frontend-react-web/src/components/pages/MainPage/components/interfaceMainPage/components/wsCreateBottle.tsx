import { ws } from "components/connections/ws"
import { WsDataType } from "components/pages/MainPage/WsDataType";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import { LatLng } from "leaflet";

type data = {
    bottleOnMap: {
        data: DataBottleDescType;
        coordinates: LatLng;
    }[];
    setBotMap: React.Dispatch<React.SetStateAction<{
        data: DataBottleDescType;
        coordinates: LatLng;
    }[]>>;
}

export const wsOnCreateBottle = (bottlesData : data) => {
    ws.onmessage = (e) => {
        console.log(e)
        let data = JSON.parse(e.data) as WsDataType
        if(data.eventNumber === 3) {
            //ПОДУМАТЬ КАК СОЗДАВАТЬ БУТЫЛКУ НЕ СОКЕТАМИ БЛЕАТЬ
            let currentBottleData: DataBottleDescType = {
                address: data.model.address,
                content: data.model.contentIds,
                countPick: data.model.maxPickingUp - data.model.pickingUp,
                description: data.model.description,
                timeLife: data.model.lifeTime,
                titleName: data.model.title,
                bottleId: data.model.id
            }
            let coord = new LatLng(data.model.lat, data.model.lng);
            let newBottle = {coordinates: coord, data: currentBottleData}
            if(!bottlesData.bottleOnMap.includes(newBottle)) {
                console.log('yes')
                bottlesData.setBotMap([...bottlesData.bottleOnMap, newBottle])
            }
            
        }
    }
}