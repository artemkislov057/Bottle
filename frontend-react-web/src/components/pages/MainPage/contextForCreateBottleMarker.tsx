import React from "react";
import { DataBottleDescType } from "./DataBottleDescriptType";


let initData: DataBottleDescType = {
    titleName:'',
    address:'',
    content:[''],
    countPick:0,
    description:'',
    timeLife:0
}

let a : React.Dispatch<React.SetStateAction<DataBottleDescType>> = function(){}

export const ContextForCreateBottleMarker = React.createContext({
        openDescriptionBar: (data: DataBottleDescType) => {return},
        data: null || initData,
        setData: a 
});