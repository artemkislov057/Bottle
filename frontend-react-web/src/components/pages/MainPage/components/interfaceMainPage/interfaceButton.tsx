import React, { useState } from "react";
import { SearchAddressControl } from "../searchAddress/searchAddress";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";

export const InterfaceButtonMainPage:React.FC = React.memo(() => {
    const [leftbarState, setLeftBar] = useState(<></>)//
    function onClickOpenLeftBar() {
        setLeftBar(<LeftBar setStateLeftBar={setLeftBar}/>)
    }

    return <>
        <select className="filter-select-mainPage">
            <option>Все</option>
            <option>Тусовки</option>
            <option>Продажи</option>
        </select>
        <div className="interfaceButton-search-field-with-otherButton">
            <button className="open-other-container-button" onClick={onClickOpenLeftBar}></button>
            <SearchAddressControl />
            <button type="submit" form="interfaceButton-search-container-form" className="search-address-container-button"></button>
        </div>
        <button className="create-bottle-button-mainPage">+</button>
        {leftbarState}
    </>
})