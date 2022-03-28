import React, { useState } from "react";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";
import { RightBar } from "./components/rightBar/rightBar";
import { HelpSearchContainer } from "./components/helpSearchContainer/helpSearchContainer";
import { RightBarProfile } from "./components/rightBarProfile/rightBarProfile";

import { RightBarDescrBottle } from "./components/rightBarDescriptBottle/rightBarDescriptBottle";

type TProps = {
    addres: string,
    setAddress: Function
}

export const InterfaceButtonMainPage:React.FC = React.memo((props) => {
    const [leftbarState, setLeftBar] = useState(<></>);
    const [rightbarState, setRightBar] = useState(<></>);
    const [rightbarProfileState, setRightBarProfile] = useState(<></>);

    const [rightBarPopup, setRightBarPopup] = useState(<></>);

    function onClickOpenLeftBar() {
        setLeftBar(<LeftBar 
            setStateLeftBar={setLeftBar} 
            onClickCreateButton={onClickOpenRightBar}
            onClickProfileInfo={onClickProfileInfofromLeft}
        />)
    }

    function onClickOpenRightBar() {
        setRightBar(<RightBar setStateRightBar={setRightBar} />);
    }

    function onClickProfileInfofromLeft() {
        setRightBarProfile(<RightBarProfile 
            setStateRightProfileBar={setRightBarProfile}
            openLeftBar={onClickOpenLeftBar}/>)
    }

    //временно
    function onClickOpenPopup() {
        setRightBarPopup(<RightBarDescrBottle />)
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
        {rightBarPopup}
    </>
})