import { LatLng } from "leaflet";
import React from "react";
import { BottleRequestType } from "./BottleRequestType";
import { DataBottleDescType } from "./DataBottleDescriptType";


let initData: DataBottleDescType = {
    titleName:'',
    address:'',
    content:[null],
    countPick:0,
    description:'',
    timeLife:0,
    bottleId: -1,
    category: 'Все категории'
}

let a : React.Dispatch<React.SetStateAction<DataBottleDescType>> = function(){};
let b : {
    data: BottleRequestType;
    coordinates: LatLng;
}[];

export const ContextForCreateBottleMarker = React.createContext({
        openDescriptionBar: (data: BottleRequestType) => {return},
        data: null || initData,
        setData: a,
        bottlesOnMap: b,
});