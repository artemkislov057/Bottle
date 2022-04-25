import React from "react";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const BottleNameContainer:React.FC<TProps> = React.memo((props) => {
    function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        props.setBottleData({...props.bottleData, titleName: e.target.value});
    }

    return <div className="right-bar-map-name-bottle-container">
        <label className="right-bar-map-name-bottle-title" htmlFor="map-name-bottle-input">Название записки</label>
        <input className="right-bar-map-name-bottle-input" 
            id="map-name-bottle-input" 
            required 
            onChange={(e) => onChangeInput(e)} 
            value={props.bottleData.titleName}>

        </input>
    </div>
})