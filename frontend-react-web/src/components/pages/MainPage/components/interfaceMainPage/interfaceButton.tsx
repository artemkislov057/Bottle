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
import { wsBottle } from "./components/wsBottle";
import { SelectCategory } from "./components/selectCategory/selectCategory";
import { WsEventContext } from "../../contextWsEvents";
import { apiUrl } from "components/connections/apiUrl";

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
    const leftRightBarsStates = [setLeftBar, setRightBar, setRightBarProfile, setRightBarMyBottles, setRightBarPopup];
    const wsEvent = useContext(WsEventContext);
    const[currentFilterCategory, setcurrentFilterCategory] = useState('Все категории');

    let initObj : BottleRequestType;
    let initObjForSelfCreate : DataBottleDescType;
    const [dataBottleDescription, setDataBottleDesc] = useState(initObjForSelfCreate);

    const [bottlesOnMap, setBottlesOnMap] = useState([{data: initObj, coordinates: new LatLng(null, null)}]);
    const [constBottlesOnMap, setConstBottlesOnMap] = useState([{data: initObj, coordinates: new LatLng(null, null)}]);

    useEffect(() => { // при обновлении стр получение всех бутылок
        if(!props.children) return;
        async function getAllBottles() {
            let res = await fetch(`${apiUrl}/api/bottles`, {
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
                    // pickingUp: e.maxPickingUp - e.pickingUp,//
                    pickingUp: e.pickingUp,
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
            setConstBottlesOnMap(newBottles);
            setBottlesOnMap(newBottles);
        }
        console.log('update')
        getAllBottles();

        return () => setBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}])
    }, [props.children]);//

    useEffect(() => {
        if(!currentFilterCategory) return;
        if(currentFilterCategory === 'Все категории') {
            setBottlesOnMap(constBottlesOnMap);
            return;
        }
        let filteredBottles = [];
        for(let e of constBottlesOnMap) {
            if(e.data?.category === currentFilterCategory) {
                filteredBottles.push(e);
            }
        }
        setBottlesOnMap(filteredBottles);

    }, [currentFilterCategory])

    useEffect(() => {
        wsBottle({bottleOnMap: bottlesOnMap, setBotMap: setBottlesOnMap, constBotMap: constBottlesOnMap, setConstBottle: setConstBottlesOnMap, currentCategory: currentFilterCategory}, wsEvent);
    }, [wsEvent]);    
       
    useEffect(() => {//for chat?
        props.openLeftMainBar.current = onClickOpenLeftBar
    }, []);

    function onClickOpenLeftBar() {
        closeOtherBars(setLeftBar);
        enableBackgroundGray();
        setLeftBar(<LeftBar 
            setStateLeftBar={setLeftBar} 
            onClickCreateButton={onClickOpenRightBar}
            onClickProfileInfo={onClickProfileInfofromLeft}
            onClickMyBottles={onClickMyBottles}
            onClickChat={props.openChat}
            onClickMap={props.openMap}
            disableBackgroundGray={disableBackgroundGray}
        />)
    }

    function onClickOpenRightBar(changeBottleData?: BottleRequestType) {
        closeOtherBars(setRightBar);
        enableBackgroundGray();
        setRightBar(<RightBar setStateRightBar={setRightBar} disableBackgroundGray={disableBackgroundGray} changeBottleData={changeBottleData} />);            
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
            openLeftBar={onClickOpenLeftBar}
            openChangeRightBar={onClickOpenRightBar}
            />)
    }    
    
    function onClickOpenPopup(data: BottleRequestType, onClickEdit?: Function) {
        closeOtherBars(setRightBarPopup);
        enableBackgroundGray();
        setRightBarPopup(<RightBarDescrBottle 
            setSelfState={setRightBarPopup}
            data={data}
            onClickOpenDialog={openPartnerChat}
            disableBackgroundGray={disableBackgroundGray}
            onClickOpenEdit={onClickEdit}
            />
        )
    }

    function enableBackgroundGray() {
        props.backgroundState(<div className="background-gray"></div>);
    }

    function disableBackgroundGray() {
        props.backgroundState(<></>);
    }

    function closeOtherBars(currentBar: React.Dispatch<React.SetStateAction<JSX.Element>>) {
        for(let e of leftRightBarsStates) {
            if(e !== currentBar) {
                e(<></>);
            }
        }
    }

    function openPartnerChat(id : number) {
        console.log(id)
        fetch(`${apiUrl}/api/bottles/${id}/pick-up`, {
            method: 'POST',            
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json().then(res => {
            console.log(res);
            let result = res as {dialogId : number};
            props.openChat(result.dialogId);
        }))
    }

    function tempLogin() {
        fetch(`${apiUrl}/api/account/login`, {
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
            <SelectCategory currentCategory={currentFilterCategory} setCategory={setcurrentFilterCategory}/>
        </div>
        
        {/* <select className="filter-select-mainPage">            
            <option className="aaaa">Все</option>
            <option>Тусовки</option>
            <option>Продажи</option>
        </select>        
         */}
        <div className="interfaceButton-search-field-with-otherButton">        
            <button className="open-other-container-button" onClick={onClickOpenLeftBar}></button>
            {/* <SearchAddressControl /> */}
            <HelpSearchContainer />
            <button type="submit" form="interfaceButton-search-container-form" className="search-address-container-button"></button>
        </div>       
        {/* <button className="create-bottle-button-mainPage" onClick={onClickOpenRightBar}>+</button> */}
        <button className="create-bottle-button-mainPage" onClick={tempLogin} onMouseOver={(e) => console.log('наводится')} onMouseOut={() => console.log('уводится')}>+</button>

        {leftbarState}
        <ContextForCreateBottleMarker.Provider 
            value={{
                openDescriptionBar: onClickOpenPopup, 
                data: dataBottleDescription, 
                setData: setDataBottleDesc,
                bottlesOnMap: bottlesOnMap,
                openEditRightBar: onClickOpenRightBar }}>
            {rightbarState}
            {props.children} {/*map*/}
        </ContextForCreateBottleMarker.Provider>
        {rightbarProfileState}
        {rightBarMyBottles}
        {rightBarPopup}
    </div>
})