import React from "react";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const DescriptionContainer:React.FC<TProps> = React.memo((props) => {
    function onChangeInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
        props.setBottleData({...props.bottleData, description: e.target.value});
    }

    return <div className="right-bar-map-description-container">
        <label className="right-bar-map-description-title" htmlFor="map-description-textArea">Описание записки</label>
        <textarea 
            className="right-bar-map-description-textArea" 
            id="map-description-textArea" 
            required 
            onChange={(e) => onChangeInput(e)}
            value={props.bottleData.description} >
            
        </textarea>
    </div>
})