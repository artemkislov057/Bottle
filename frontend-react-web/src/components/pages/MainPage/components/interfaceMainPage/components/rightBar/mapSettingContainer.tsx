import React, { useEffect, useState } from "react";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const SettingContainer:React.FC<TProps> = React.memo((props) => {
    const [hoursInSec, setHoursInSec] = useState(0);
    const [minutesInSec, setMinutesInSec] = useState(0);

    function onChangeTimeInput(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        let currentSeconds = 0;
        if(type === 'hour') {
            currentSeconds = +e.target.value * 60 * 60;
            setHoursInSec(currentSeconds);
        } else {
            currentSeconds = +e.target.value * 60;
            setMinutesInSec(currentSeconds);
        }
    }

    useEffect(() => {
        props.setBottleData({...props.bottleData, timeLife: hoursInSec + minutesInSec});
    }, [hoursInSec, minutesInSec])

    function onChangePickCount(e: React.ChangeEvent<HTMLInputElement>) {
        props.setBottleData({...props.bottleData, countPick: +e.target.value})
    }

    return <div className="right-bar-map-setting-container">
        <div className="right-bar-map-setting-timeLife">
            <label className="right-bar-map-setting-timeLife-title">Длительность записки</label>
            <div className="right-bar-map-setting-TL">
                <input className="right-bar-map-setting-TL-hour-input" type={"number"} min="0" max='11'  onChange={e => onChangeTimeInput(e, 'hour')} required/>
                :
                <input className="right-bar-map-setting-TL-minut-input" type={"number"} min="0" max='59'  onChange={e => onChangeTimeInput(e, 'minutes')} required/>
            </div>                    
        </div>
        <div className="right-bar-map-setting-pick-count">
            <label className="right-bar-map-setting-pick-count-title" htmlFor="pick-count-input">Количество поднятий</label>
            <input className="right-bar-map-setting-pick-count-input" id="pick-count-input" type={"number"} min='1' onChange={e => onChangePickCount(e)} required/>
        </div>
    </div>
})