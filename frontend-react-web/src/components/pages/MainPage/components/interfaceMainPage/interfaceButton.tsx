import React, { useEffect, useState } from "react";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";
import { RightBar } from "./components/rightBar/rightBar";
import { HelpSearchContainer } from "./components/helpSearchContainer/helpSearchContainer";
import { RightBarProfile } from "./components/rightBarProfile/rightBarProfile";
import { RightBarMyBottles } from "./components/rightBarMyBottles/rightBarMyBottles";

import { RightBarDescrBottle } from "./components/rightBarDescriptBottle/rightBarDescriptBottle";

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

    const leftRightBars = [setLeftBar, setRightBar, setRightBarProfile, setRightBarMyBottles, setRightBarPopup]

    useEffect(() => {
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

    //временно
    function onClickOpenPopup() {
        setRightBarPopup(<RightBarDescrBottle />)
    }

    function closeOtherBars(currentBar: React.Dispatch<React.SetStateAction<JSX.Element>>) {
        for(let e of leftRightBars) {
            if(e !== currentBar) {
                e(<></>);
            }
        }
    }

    return <>
        {props.children}        
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
        <button className="create-bottle-button-mainPage" onClick={onClickOpenPopup}>+</button>

        {leftbarState}
        {rightbarState}
        {rightbarProfileState}
        {rightBarMyBottles}
        {rightBarPopup}
    </>
})