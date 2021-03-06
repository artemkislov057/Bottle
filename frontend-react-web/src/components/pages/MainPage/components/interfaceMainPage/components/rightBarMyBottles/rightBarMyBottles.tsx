import React, { useEffect, useState } from "react";
import './rightBarMyBottles.css'
import { ListBottleItem } from "./listBottleItem";
import { RightBarHeader } from "../rightBar/header";
import { apiUrl } from "components/connections/apiUrl";

import commercIcon from './categoryIcon/categoryCommercIcon.svg';
import hangIcon from './categoryIcon/categoryHangIcon.svg';
import meetIcon from './categoryIcon/categoryAcquaintanceIcon.svg';
import sportIcon from './categoryIcon/categorySportIcon.svg';
import otherIcon from './categoryIcon/categoryOtherIcon.svg';
import { BottleRequestType } from "components/pages/MainPage/BottleRequestType";
import { MapModal } from "../../../questModal/questModal";
import modalIcon from '../../../questModal/deleteBottleModalIcon.svg';

type TProps = {
    setRightBarMyBottles: React.Dispatch<React.SetStateAction<JSX.Element>>,
    openLeftBar: Function,
    openChangeRightBar: Function,
    closeThis: Function
    setQuestModal: React.Dispatch<React.SetStateAction<JSX.Element>>
    setShowQuestModal: React.Dispatch<React.SetStateAction<boolean>>
}


export const RightBarMyBottles:React.FC<TProps> = React.memo((props) => {
    let init : Array<BottleRequestType>;
    const [currentBottles, setCurrentBottles] = useState(init);
    
    const categoryIcons: Map<string, string> = new Map();
    categoryIcons.set('Продажи', commercIcon);
    categoryIcons.set('Тусовки', hangIcon);
    categoryIcons.set('Знакомства', meetIcon);
    categoryIcons.set('Спорт', sportIcon);
    categoryIcons.set('Прочее', otherIcon);
    categoryIcons.set('Все категории', otherIcon);

    useEffect(() => {
        async function getMyBottles() {
            let myBottlesResponse = await fetch(`${apiUrl}/api/bottles/my`, {
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

    function onClickDeleteBottle(bottleData: BottleRequestType) {
        props.setQuestModal(<MapModal 
            imageUrl={modalIcon}
            titleQuest='Вы уверены, что хотите удалить бутылочку?'
            onClickNoButton={() => props.setShowQuestModal(false)}
            onClickYesButton={() => deleteBottle(bottleData)}
        />);
        props.setShowQuestModal(true);
    }

    async function deleteBottle(bottleData: BottleRequestType) {
        let deleteResponse = await fetch(`${apiUrl}/api/bottles/${bottleData.id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if(deleteResponse.ok) {
            let tempCurrentBottles = currentBottles.slice();
            let ind = tempCurrentBottles.indexOf(bottleData);
            tempCurrentBottles.splice(ind, 1);
            props.setShowQuestModal(false);
            setCurrentBottles(tempCurrentBottles);
        }        
    }

    function onClickBackButton() {
        // props.setRightBarMyBottles(<></>);
        props.closeThis();
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
                    demoDescr = bottle.description;
                }
                let icon = categoryIcons.get(bottle.category);
                return <ListBottleItem 
                    key={bottle.address + bottle.description}
                    title={bottle.title}
                    demoDescript={demoDescr}
                    urlIcon={icon}
                    bottleData={bottle}
                    onClickDelete={() => onClickDeleteBottle(bottle)}
                    onClickChange={() => props.openChangeRightBar(bottle)}
                />
                }
            )}            
        </div>
    </div>
})