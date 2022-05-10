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
    changeBottleData?: BottleRequestType,
    currentBottleData?: DataBottleDescType
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

    async function saveChangeData() {
        let responseGetBottleInfo = await fetch(`${apiUrl}/api/bottles/${bottleData.bottleId}`, {
            credentials: 'include'
        })

        let bottleInfo = await responseGetBottleInfo.json() as BottleRequestType;
        if(bottleInfo) {
            let response = await fetch(`${apiUrl}/api/bottles/${props.changeBottleData.id}/change`, {
                method: 'POST',
                body: JSON.stringify({
                    geoObjectName: "string",
                    address: bottleData.address,
                    title: bottleData.titleName,
                    description: bottleData.description,
                    category: bottleData.category,
                    lifeTime: bottleData.timeLife.toFixed(0),
                    maxPickingUp: bottleData.countPick
                }),
                credentials: "include",            
                headers: {
                    'Content-type': 'application/json'
                }
            });
    
            if(bottleData.content) {
                if(bottleInfo.contentIds) {
                    for(let e of bottleInfo?.contentIds) {
                        await fetch(`${apiUrl}/api/bottles/${bottleData.bottleId}/content/${e}`, {
                            method: 'DELETE',
                            credentials: "include",                           
                        });
                    }
                }
                

                for(let e of bottleData.content) {
                    let formData = new FormData();
                    formData.append('file', e);
    
                    await fetch(`${apiUrl}/api/bottles/${bottleData.bottleId}/content`, {
                        method: 'POST',
                        body: formData,
                        credentials: "include",                           
                    });
                }
            }
    
            if(response.ok) {
                console.log('save change');
                onClickBackToMapButton();
            }
        }        
    }

    function changeLocateBottle() {
        console.log('change locate and save data')
        saveChangeData()
        onSubmitBottleDataForm();
        
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

            if(delta > data.lifeTime) {
                delta -= -offset * 60;
            }

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

    useEffect(() => {
        if(!props.currentBottleData) return;
        setBottleData(props.currentBottleData);
    }, [props.currentBottleData])

    if(props.changeBottleData) {
        return <div className="right-bar-map">
            <RightBarHeader onClick={onClickBackToMapButton} title='Редактировать записку'/>
            <RightBarBody onSubmit={saveChangeData} setBottleData={setBottleData} bottleData={bottleData}/>
            <RightBarFooter title="Выбрать адрес" onClick={changeLocateBottle} onClickSecondButton={findPlaceForBottle} secondTitle='Сохранить'/>
        </div>
    }

    return <div className="right-bar-map">
        <RightBarHeader onClick={onClickBackToMapButton} title='Создать записку'/>
        <RightBarBody onSubmit={onSubmitBottleDataForm} setBottleData={setBottleData} bottleData={bottleData}/>        
        <RightBarFooter title="Выбрать адрес" onClick={findPlaceForBottle}/>
    </div>
})