import React, { useEffect, useState } from "react";

import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";

import { BottleNameContainer } from "./mapBottleNameContainer";
import { CategoryContainer } from "./mapCategoryContainer";
import { DescriptionContainer } from "./mapDescriptContainer";
import { SettingContainer } from "./mapSettingContainer";
import { PhotosContainer } from "./mapPhotosContainer";

type TProps = {
    onSubmit: Function,
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const RightBarBody:React.FC<TProps> = React.memo((props) => {
    // сделать, чтобы все инпуты были заполнены текущей инфой, сделать, чтобы картинки уже отображались(мб выше сделать запрос на картинки), далее либо удалять старую и сохранять новую бутылку, либо ждать артема
    const [currentCategory, setCurrentCategory] = useState('Все категории');

    useEffect(() => {
        props.setBottleData({...props.bottleData, category: currentCategory});
    }, [currentCategory]);

    return <form id="right-bar-map-body-form" className="right-bar-map-body" onSubmit={(e) => { e.preventDefault(); props.onSubmit() }}>
        <BottleNameContainer bottleData={props.bottleData} setBottleData={props.setBottleData}/>
        <CategoryContainer setCategory={setCurrentCategory} currentCategory={props.bottleData?.category}/>
        <DescriptionContainer bottleData={props.bottleData} setBottleData={props.setBottleData} />
        <SettingContainer bottleData={props.bottleData} setBottleData={props.setBottleData} />
        <PhotosContainer bottleData={props.bottleData} setBottleData={props.setBottleData} />
    </form>
})