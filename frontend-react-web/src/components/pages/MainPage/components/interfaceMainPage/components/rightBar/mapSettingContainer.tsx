import React, { useEffect, useState } from "react";
import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const SettingContainer:React.FC<TProps> = React.memo((props) => {
    const [hoursInSec, setHoursInSec] = useState(0);
    const [minutesInSec, setMinutesInSec] = useState(0);

    const [maxTimeHour, setMaxTimeHour] = useState(23);
    const [maxTimeMinutes, setMaxTimeMinutes] = useState(59);

    const [currentHours, setCurrentHours] = useState('');
    const [currentMinutes, setCurrentMinutes] = useState('');

    const [currentPickCount, setCurrentPickCount] = useState(0);


    function onChangeTimeInput(e: React.ChangeEvent<HTMLInputElement>, type: string) {
        let currentSeconds = 0;
        if(type === 'hour') {
            currentSeconds = +e.target.value * 60 * 60;
            setHoursInSec(currentSeconds);
            setCurrentHours(e.target.value);
        } else {
            currentSeconds = +e.target.value * 60;
            setMinutesInSec(currentSeconds);
            setCurrentMinutes(e.target.value);
        }
    }

    useEffect(() => {        
        props.setBottleData({...props.bottleData, timeLife: hoursInSec + minutesInSec});
    }, [hoursInSec, minutesInSec]);

    useEffect(() => {
        if(props.bottleData.initTimeLife) {
            let initTLInSec = props.bottleData.initTimeLife;
            let accessTimeInSec = 24 * 60 * 60 - initTLInSec + props.bottleData.timeLife;

            let [maxH, maxM] = calculateTime(accessTimeInSec);
            console.log([maxH, maxM])
            console.log(accessTimeInSec)
            setMaxTimeHour(+maxH);
            console.log(maxH);
            setMaxTimeMinutes(+maxM);
            console.log(maxM)

            let [currH, currM] = calculateTime(props.bottleData.timeLife);
            
            setCurrentHours(currH);
            setCurrentMinutes(currM);

            setCurrentPickCount(props.bottleData.countPick);
        }
    }, [props.bottleData?.initTimeLife]);

    function calculateTime(timeInSec: number) {
        let minutes = (timeInSec / 60).toFixed(0);
            let hours = '';
            if(+minutes > 59) {
                hours = Math.floor(+minutes / 60).toFixed(0);
                minutes = (+minutes % 60).toFixed(0);
            }
        return [hours, minutes];
    }
   
    function onChangePickCount(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentPickCount(+e.target.value);
        props.setBottleData({...props.bottleData, countPick: +e.target.value})
    }

    return <div className="right-bar-map-setting-container">
        <div className="right-bar-map-setting-timeLife">
            <label className="right-bar-map-setting-timeLife-title">Длительность записки</label>
            <div className="right-bar-map-setting-TL">
                <input className="right-bar-map-setting-TL-hour-input" 
                    type={"number"} 
                    min="0" 
                    max={maxTimeHour || 23}  
                    onChange={e => onChangeTimeInput(e, 'hour')} 
                    value={currentHours || ''} 
                    required/>
                :
                <input className="right-bar-map-setting-TL-minut-input" 
                    type={"number"} 
                    min="0" 
                    max={+currentHours === maxTimeHour ? maxTimeMinutes : 59}  
                    onChange={e => onChangeTimeInput(e, 'minutes')} 
                    value={currentMinutes || ''} 
                    required/>
            </div>                    
        </div>
        <div className="right-bar-map-setting-pick-count">
            <label className="right-bar-map-setting-pick-count-title" htmlFor="pick-count-input">Количество поднятий</label>
            <input className="right-bar-map-setting-pick-count-input" id="pick-count-input" type={"number"} min='1' onChange={e => onChangePickCount(e)} value={currentPickCount} required/>
        </div>
    </div>
})