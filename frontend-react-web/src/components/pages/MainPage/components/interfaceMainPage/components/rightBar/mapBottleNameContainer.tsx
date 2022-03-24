import React from "react";

export const BottleNameContainer:React.FC = React.memo(() => {
    return <div className="right-bar-map-name-bottle-container">
        <label className="right-bar-map-name-bottle-title" htmlFor="map-name-bottle-input">Название записки</label>
        <input className="right-bar-map-name-bottle-input" id="map-name-bottle-input"></input>
    </div>
})