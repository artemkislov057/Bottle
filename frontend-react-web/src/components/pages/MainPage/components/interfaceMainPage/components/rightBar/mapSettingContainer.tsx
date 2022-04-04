import React from "react";

export const SettingContainer:React.FC = React.memo(() => {
    return <div className="right-bar-map-setting-container">
        <div className="right-bar-map-setting-timeLife">
            <label className="right-bar-map-setting-timeLife-title">Длительность записки</label>
            <div className="right-bar-map-setting-TL">
                <input className="right-bar-map-setting-TL-hour-input" type={"number"} min="1" max='11' defaultValue={1} />
                :
                <input className="right-bar-map-setting-TL-minut-input" type={"number"} min="0" max='59' defaultValue={0}/>
            </div>                    
        </div>
        <div className="right-bar-map-setting-pick-count">
            <label className="right-bar-map-setting-pick-count-title" htmlFor="pick-count-input">Количество поднятий</label>
            <input className="right-bar-map-setting-pick-count-input" id="pick-count-input" type={"number"} min='1' defaultValue={1}/>
        </div>
    </div>
})