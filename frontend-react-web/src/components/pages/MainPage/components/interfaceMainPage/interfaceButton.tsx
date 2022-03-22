import React from "react";
import { SearchAddressControl } from "../searchAddress/searchAddress";
import './interfaceButton.css';

export const InterfaceButtonMainPage:React.FC = React.memo(() => {
    return <>
        <select className="filter-select-mainPage">
            <option>Все</option>
            <option>Тусовки</option>
            <option>Продажи</option>
        </select>
        <div className="interfaceButton-search-field-with-otherButton">
            <button className="open-other-container-button">---</button>
            <SearchAddressControl />
            <button className="search-address-container-button">Search</button>
        </div>
        <button className="create-bottle-button-mainPage">+</button>
    </>
})