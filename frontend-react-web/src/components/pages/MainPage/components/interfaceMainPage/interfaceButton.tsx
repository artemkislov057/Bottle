import React, { useEffect, useState } from "react";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";
import { RightBar } from "./components/rightBar/rightBar";
import { HelpSearchContainer } from "./components/helpSearchContainer/helpSearchContainer";
import { RightBarProfile } from "./components/rightBarProfile/rightBarProfile";
import { RightBarMyBottles } from "./components/rightBarMyBottles/rightBarMyBottles";
import { ContextForCreateBottleMarker } from "../../contextForCreateBottleMarker";
import { BottlesRequestArrayType } from "../../BottlesRequestArrayType";

import { DataBottleDescType } from "../../DataBottleDescriptType";

import { RightBarDescrBottle } from "./components/rightBarDescriptBottle/rightBarDescriptBottle";
import { LatLng } from "leaflet";

type TProps = {
    // addres: string,
    // setAddress: Function,
    backgroundState: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openChat: Function,
    openMap: Function,
    openLeftMainBar: React.MutableRefObject<() => void>
}

export const InterfaceButtonMainPage:React.FC<TProps> = React.memo((props) => {
    const [leftbarState, setLeftBar] = useState(<></>);
    const [rightbarState, setRightBar] = useState(<></>);
    const [rightbarProfileState, setRightBarProfile] = useState(<></>);
    const [rightBarMyBottles, setRightBarMyBottles] = useState(<></>);
    const [rightBarPopup, setRightBarPopup] = useState(<></>);

    let initObj : DataBottleDescType = {
        titleName:'',
        address:'',
        content: null,
        countPick:0,
        description: null,
        timeLife:0
    }
    const [dataBottleDescription, setDataBottleDesc] = useState(initObj);

    const [bottlesOnMap, setBottlesOnMap] = useState([{data: initObj, coordinates: new LatLng(null, null)}])
    //состояние с бутылками, которые уже есть на карте -> обновляется через вебсокеты или при создании клиентом бутылки
    //useEffect для обновления состояния ^ при перезагрузке стр

    useEffect(() => {
        async function getAllBottles() {
            let res = await fetch('https://localhost:44358/api/bottles', {
                credentials: 'include'
            })
            let bottles = await res.json() as BottlesRequestArrayType;
            // console.log(bottles)
            let newBottles : [{data: DataBottleDescType, coordinates: LatLng}] = [null];
            for(let e of bottles) {
                let currentBottleData: DataBottleDescType = {
                    address: e.address,
                    content: e.contentIds,
                    countPick: e.maxPickingUp - e.pickingUp,
                    description: e.description,
                    timeLife: e.lifeTime,
                    titleName: e.title
                }
                if (newBottles[0] === null) {
                    newBottles = [{coordinates: new LatLng(e.lat, e.lng), data: currentBottleData}];
                } else {
                    newBottles.push({coordinates: new LatLng(e.lat, e.lng), data: currentBottleData});
                }
            }
            // setBottlesOnMap([...bottlesOnMap, {coordinates: new LatLng(e.lat, e.lng), data: currentBottleData}])
            // console.log(newBottles)
            setBottlesOnMap(newBottles);            
        }
        console.log('update')
        getAllBottles();

        return () => setBottlesOnMap([{data: initObj, coordinates: new LatLng(null, null)}])
    }, [props.children]);

    useEffect(() => {
        // console.log(bottlesOnMap)
    }, [bottlesOnMap])
    

    const leftRightBars = [setLeftBar, setRightBar, setRightBarProfile, setRightBarMyBottles, setRightBarPopup]

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

    let tempData = {
        titleName:'Oh fuck, is test',
        address:'блю',
        content:[''],
        countPick:2,
        description:'Описание описание описание',
        timeLife:10
    }

    
    //временно
    function onClickOpenPopup(data: DataBottleDescType) {
        setRightBarPopup(<RightBarDescrBottle 
                setSelfState={setRightBarPopup}
                data={ 
                    data
                }                
            />)
    }

    function closeOtherBars(currentBar: React.Dispatch<React.SetStateAction<JSX.Element>>) {
        for(let e of leftRightBars) {
            if(e !== currentBar) {
                e(<></>);
            }
        }
    }


    return <>
        {/* <ContextForCreateBottleMarker.Provider value={onClickOpenPopup}>
            
        </ContextForCreateBottleMarker.Provider> */}
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
        <button className="create-bottle-button-mainPage" onClick={onClickOpenRightBar}>+</button>

        {leftbarState}
        <ContextForCreateBottleMarker.Provider value={{openDescriptionBar: onClickOpenPopup, data: dataBottleDescription, setData: setDataBottleDesc, bottlesOnMap: bottlesOnMap }}>
            {rightbarState}
            {props.children} {/*map*/}
        </ContextForCreateBottleMarker.Provider>
        {rightbarProfileState}
        {rightBarMyBottles}
        {rightBarPopup}
    </>
})