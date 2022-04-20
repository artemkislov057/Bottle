import React, { useContext, useEffect, useState } from "react";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";
import { RightBar } from "./components/rightBar/rightBar";
import { HelpSearchContainer } from "./components/helpSearchContainer/helpSearchContainer";
import { RightBarProfile } from "./components/rightBarProfile/rightBarProfile";
import { RightBarMyBottles } from "./components/rightBarMyBottles/rightBarMyBottles";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";
import { BottleRequestType } from "../../BottleRequestType";
import { ws } from "components/connections/ws";
import { WsDataType } from "../../WsDataType";
import { wsOnCreateBottle } from "./components/wsCreateBottle";
import { SelectCategory } from "./components/selectCategory/selectCategory";
import { WsEventContext } from "../../contextWsEvents";

import { DataBottleDescType } from "../../DataBottleDescriptType";

import { RightBarDescrBottle } from "./components/rightBarDescriptBottle/rightBarDescriptBottle";
import { LatLng } from "leaflet";

type TProps = {    
    backgroundState: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openChat: Function,
    openMap: Function,
    openLeftMainBar: React.MutableRefObject<() => void>,    
}

export const InterfaceButtonMainPage:React.FC<TProps> = React.memo((props) => {
    const [leftbarState, setLeftBar] = useState(<></>);
    const [rightbarState, setRightBar] = useState(<></>);
    const [rightbarProfileState, setRightBarProfile] = useState(<></>);
    const [rightBarMyBottles, setRightBarMyBottles] = useState(<></>);
    const [rightBarPopup, setRightBarPopup] = useState(<></>);
    const leftRightBars = [setLeftBar, setRightBar, setRightBarProfile, setRightBarMyBottles, setRightBarPopup];
    const wsEvent = useContext(WsEventContext);

    // let initObj : DataBottleDescType = {
    //     titleName:'',
    //     address:'',
    //     content: null,
    //     countPick:0,
    //     description: null,
    //     timeLife:0,
    //     bottleId: -1,
    //     category: 'Все категории'
    // }

    let initObj : BottleRequestType;
    let initObjForSelfCreate : DataBottleDescType;
    const [dataBottleDescription, setDataBottleDesc] = useState(initObjForSelfCreate);

    const [bottlesOnMap, setBottlesOnMap] = useState([{data: initObj, coordinates: new LatLng(null, null)}])
    //состояние с бутылками, которые уже есть на карте -> обновляется через вебсокеты или при создании клиентом бутылки
    //useEffect для обновления состояния ^ при перезагрузке стр

    useEffect(() => { // при обновлении стр получение всех бутылок
        async function getAllBottles() {
            let res = await fetch('https://localhost:44358/api/bottles', {
                credentials: 'include'
            })
            let bottles = await res.json() as Array<BottleRequestType>;
            if(bottles.length < 1) {
                return
            }
            console.log(bottles)
            let newBottles : [{data: BottleRequestType, coordinates: LatLng}] = [null];
            for(let e of bottles) {
                let currentBottleData: BottleRequestType = {
                    active: e.active,
                    created: e.created,
                    endTime: e.endTime,
                    geoObjectName: e.geoObjectName,
                    isContentLoaded: e.isContentLoaded,
                    lat: e.lat,
                    lng: e.lng,
                    maxPickingUp: e.maxPickingUp,
                    userId: e.userId,
                    address: e.address,
                    contentIds: e.contentIds,
                    contentItemsCount: e.contentIds?.length,
                    pickingUp: e.maxPickingUp - e.pickingUp,
                    description: e.description,
                    lifeTime: e.lifeTime,
                    title: e.title,
                    id: e.id,
                    category: e.category
                }
                if (newBottles[0] === null) {
                    newBottles = [{coordinates: new LatLng(e.lat, e.lng), data: currentBottleData}];
                } else {                    
                    newBottles.push({coordinates: new LatLng(e.lat, e.lng), data: currentBottleData});
                }
            }
            setBottlesOnMap(newBottles);
        }
        console.log('update')
        getAllBottles();

        return () => setBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}])
    }, [props.children]);//

    useEffect(() => {
        wsOnCreateBottle({bottleOnMap: bottlesOnMap, setBotMap: setBottlesOnMap}, wsEvent);
    }, [wsEvent]);    
       
    useEffect(() => {//for chat?
        props.openLeftMainBar.current = onClickOpenLeftBar
    }, [])

    function onClickOpenLeftBar() {
        closeOtherBars(setLeftBar);
        setBackgroundGray();
        setLeftBar(<LeftBar 
            setStateLeftBar={setLeftBar} 
            onClickCreateButton={onClickOpenRightBar}
            onClickProfileInfo={onClickProfileInfofromLeft}
            onClickMyBottles={onClickMyBottles}
            onClickChat={props.openChat}
            onClickMap={props.openMap}
        />)
    }

    function onClickOpenRightBar() {
        closeOtherBars(setRightBar);
        setBackgroundGray();
        setRightBar(<RightBar setStateRightBar={setRightBar} />);            
    }

    function onClickProfileInfofromLeft() {
        closeOtherBars(setRightBarProfile);
        setRightBarProfile(<RightBarProfile 
            setStateRightProfileBar={setRightBarProfile}
            openLeftBar={onClickOpenLeftBar}/>)
    }

    function onClickMyBottles() {
        closeOtherBars(setRightBarMyBottles);
        setRightBarMyBottles(<RightBarMyBottles 
            setRightBarMyBottles={setRightBarMyBottles}
            openLeftBar={onClickOpenLeftBar}/>)
    }

    function setBackgroundGray() {
        props.backgroundState(<div className="background-gray"></div>);
    }
    
    function onClickOpenPopup(data: BottleRequestType) {
        closeOtherBars(setRightBarPopup);
        setRightBarPopup(<RightBarDescrBottle 
            setSelfState={setRightBarPopup}
            data={data}
            onClickOpenDialog={openPartnerChat}/>
        )
    }

    function closeOtherBars(currentBar: React.Dispatch<React.SetStateAction<JSX.Element>>) {
        for(let e of leftRightBars) {
            if(e !== currentBar) {
                e(<></>);
            }
        }
    }

    function openPartnerChat(id : number) {
        console.log(id)
        fetch(`https://localhost:44358/api/bottles/${id}/pick-up`, {
            method: 'POST',            
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json().then(res => {
            console.log(res);
            let result = res as {dialogId : number}
            props.openChat(result.dialogId);
        }))
    }

    function tempLogin() {
        fetch('https://localhost:44358/api/account/login', {
            method: 'POST',
            body: JSON.stringify({
                "nickname": "Man",
                "password": "000",
                "email": "aaa",
                "sex": 'false',
                commercialData: null
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return <div className="interface-button-container">
        <div className="select-category-mainPage-input">
            <SelectCategory />
        </div>
        
        <select className="filter-select-mainPage">            
            <option className="aaaa">Все</option>
            <option>Тусовки</option>
            <option>Продажи</option>
        </select>        
        
        <div className="interfaceButton-search-field-with-otherButton">        
            <button className="open-other-container-button" onClick={onClickOpenLeftBar}></button>
            {/* <SearchAddressControl /> */}
            <HelpSearchContainer />
            <button type="submit" form="interfaceButton-search-container-form" className="search-address-container-button"></button>
        </div>       
        {/* <button className="create-bottle-button-mainPage" onClick={onClickOpenRightBar}>+</button> */}
        <button className="create-bottle-button-mainPage" onClick={tempLogin}>+</button>

        {leftbarState}
        <ContextForCreateBottleMarker.Provider value={{openDescriptionBar: onClickOpenPopup, data: dataBottleDescription, setData: setDataBottleDesc, bottlesOnMap: bottlesOnMap }}>
            {rightbarState}
            {props.children} {/*map*/}
        </ContextForCreateBottleMarker.Provider>
        {rightbarProfileState}
        {rightBarMyBottles}
        {rightBarPopup}
    </div>
})