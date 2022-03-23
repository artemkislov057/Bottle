import React, { useState } from "react";
import './interfaceButton.css';
import { LeftBar } from "./components/leftBar/leftBar";
import { HelpSearchContainer } from "./components/helpSearchContainer/helpSearchContainer";

type TProps = {
    addres: string,
    setAddress: Function
}

export const InterfaceButtonMainPage:React.FC = React.memo((props) => {
    const [leftbarState, setLeftBar] = useState(<></>)
    function onClickOpenLeftBar() {
        setLeftBar(<LeftBar setStateLeftBar={setLeftBar} />)
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
       
        <button className="create-bottle-button-mainPage">+</button>
        {leftbarState}
    </>
})