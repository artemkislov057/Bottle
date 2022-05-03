import React, { useContext, useEffect, useState } from "react";
import './rightBar.css';

import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

import { RightBarHeader } from "./header";
import { RightBarBody } from "./body";
import { RightBarFooter } from "./footer";
import { apiUrl } from "components/connections/apiUrl";

import { ContextForCreateBottleMarker } from "components/pages/MainPage/contextForCreateBottleMarker"; 
import { OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";

type TProps = {
    setStateRightBar: React.Dispatch<React.SetStateAction<JSX.Element>>,
    disableBackgroundGray: Function,
    changeBottleData?: BottleRequestType
}

export const RightBar:React.FC<TProps> = React.memo((props) => {
    let {setData} = useContext(ContextForCreateBottleMarker);
    let initObj : DataBottleDescType = {
        titleName:'',
        address:'',
        content:null,
        countPick:0,
        description:'',
        timeLife:0,
        bottleId: -1,
        category: 'Все категории'
    }
    const [bottleData, setBottleData] = useState(initObj);

    function onClickBackToMapButton() {
        props.setStateRightBar(<></>);
        props.disableBackgroundGray();
    }

    function findPlaceForBottle() {
        // onClickBackToMapButton();
    }

    function onSubmitBottleDataForm() {
        console.log('fuck')
        onClickBackToMapButton();

        setData(bottleData);
    }

    function saveChangeData() {
        console.log('save change');
        //методами с сервака сохранять данные и закрывать попап
        // setBottleData(initObj);
        // ...
    }

    function changeLocateBottle() {
        console.log('change locate')
        //хранить в каждой бутылке bool стейт для маркера - dragable, при нажатии разрешать двигать маркер, сделать кнопку сохранения позиции и => сохр изменений
        // ...
    }

    useEffect(() => {
        if(!props.changeBottleData) return;
        async function getBottleData() {
            let data = props.changeBottleData;
            let photos = Array<File>();
            console.log(data)
            if(data.contentItemsCount && data.contentItemsCount !== 0) {
                for(let e of data?.contentIds) {
                    let response = await fetch(`${apiUrl}/api/bottles/${data.id}/content/${e}`, {
                        credentials: "include"
                    });
                    let blobPhoto = await response.blob();
                    let file = new File([blobPhoto], 'photo');
                    photos.push(file);
                }    
            }

            let offset = new Date().getTimezoneOffset();
            let endTime = new Date(data.endTime).getTime() / 1000 + (-offset * 60);        
            let delta = endTime - new Date().getTime() / 1000; // inSec
            setBottleData({
                address: data.address,
                bottleId: data.id,
                category: data.category,
                countPick: data.maxPickingUp - data.pickingUp,
                description: data.description,
                timeLife: delta,
                titleName: data.title,
                content: photos,
                initTimeLife: data.lifeTime
            })            
        }

        getBottleData();
    }, [props.changeBottleData]);

    if(props.changeBottleData) {
        return <div className="right-bar-map">
            <RightBarHeader onClick={onClickBackToMapButton} title='Редактировать записку'/>
            <RightBarBody onSubmit={saveChangeData} setBottleData={setBottleData} bottleData={bottleData}/>
            <RightBarFooter title="Выбрать адрес" onClick={findPlaceForBottle} onClickSecondButton={findPlaceForBottle} secondTitle='Сохранить'/>
        </div>
    }

    return <div className="right-bar-map">
        <RightBarHeader onClick={onClickBackToMapButton} title='Создать записку'/>
        <RightBarBody onSubmit={onSubmitBottleDataForm} setBottleData={setBottleData} bottleData={bottleData}/>        
        <RightBarFooter title="Выбрать адрес" onClick={findPlaceForBottle}/>
    </div>
})