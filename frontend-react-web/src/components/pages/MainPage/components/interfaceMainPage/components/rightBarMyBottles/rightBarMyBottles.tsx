import React, { useEffect, useState } from "react";
import './rightBarMyBottles.css'
import { ListBottleItem } from "./listBottleItem";
import { RightBarHeader } from "../rightBar/header";

import commercIcon from './commercCategoryIcon.svg';
import hangIcon from './hangoutCategoryIcon.svg';
import meetIcon from './meetingCategoryIcon.svg';
import sportIcon from './sportCategoryIcon.svg';
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";

type TProps = {
    setRightBarMyBottles: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openLeftBar: Function
}


export const RightBarMyBottles:React.FC<TProps> = React.memo((props) => {
    let init : Array<BottleRequestType>;
    const [currentBottles, setCurrentBottles] = useState(init);

    useEffect(() => {
        async function getMyBottles() {
            let myBottlesResponse = await fetch('https://localhost:44358/api/bottles/my', {
                credentials: 'include'
            })

            let myBottles = await myBottlesResponse.json() as Array<BottleRequestType>;
            console.log(myBottles)

            let allBottles = [];
            for(let bottle of myBottles) {
                if(!bottle.active) continue
                allBottles.push(bottle);
            }
            setCurrentBottles(allBottles);
        }

        getMyBottles();
    }, []);

    async function deleteBottle(bottleData: BottleRequestType) {
        let deleteResponse = await fetch(`https://localhost:44358/api/bottles/${bottleData.id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if(deleteResponse.ok) {
            let tempCurrentBottles = currentBottles.slice();
            let ind = tempCurrentBottles.indexOf(bottleData);
            tempCurrentBottles.splice(ind, 1);
            setCurrentBottles(tempCurrentBottles)
        }        
    }

    function onClickBackButton() {
        props.setRightBarMyBottles(<></>);
        props.openLeftBar();
    }
    
    return <div className="right-bar-map-my-bottles">
        <RightBarHeader title="Мои записки" onClick={onClickBackButton} />
        <div className="right-bar-map-my-bottles-items">
            {currentBottles?.map(bottle => {
                let demoDescr = '';
                if(bottle.description && bottle.description.length > 40) {                    
                    demoDescr = `${bottle.description.substring(0,40)}...`;                    
                } else {
                    demoDescr = bottle.description
                }
                return <ListBottleItem 
                    key={bottle.address + bottle.description}
                    title={bottle.title}
                    demoDescript={demoDescr}
                    urlIcon={hangIcon}
                    bottleData={bottle}
                    onClickDelete={deleteBottle}
                />
                }
            )}            
        </div>
    </div>
})