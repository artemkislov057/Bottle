import React, { useContext, useState } from "react";
import './rightBar.css';

import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

import { RightBarHeader } from "./header";
import { RightBarBody } from "./body";
import { RightBarFooter } from "./footer";

import { ContextForCreateBottleMarker } from "components/pages/MainPage/contextForCreateBottleMarker"; 
import { OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";

type TProps = {
    setStateRightBar: React.Dispatch<React.SetStateAction<JSX.Element>>
}

export const RightBar:React.FC<TProps> = React.memo((props) => {
    let {setData} = useContext(ContextForCreateBottleMarker);
    let initObj : DataBottleDescType = {
        titleName:'',
        address:'',
        content:null,
        countPick:0,
        description:'',
        timeLife:0//seconds
    }
    const [bottleData, setBottleData] = useState(initObj);

    function onClickBackToMapButton() {
        props.setStateRightBar(<></>);
    }

    function findPlaceForBottle() {
        onClickBackToMapButton();
    }

    function onSubmitBottleDataForm() {
        onClickBackToMapButton();

        setData(bottleData);
    }

    

    return <div className="right-bar-map">
        <RightBarHeader onClick={onClickBackToMapButton} title='Создать записку'/>
        <RightBarBody onSubmit={onSubmitBottleDataForm} setBottleData={setBottleData} bottleData={bottleData}/>
        <RightBarFooter title="Выбрать адрес" onClick={findPlaceForBottle}/>
    </div>
})