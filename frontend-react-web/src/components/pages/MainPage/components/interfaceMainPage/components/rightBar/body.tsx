import React from "react";

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
    return <form id="right-bar-map-body-form" className="right-bar-map-body" onSubmit={(e) => { e.preventDefault(); props.onSubmit() }}>
        <BottleNameContainer bottleData={props.bottleData} setBottleData={props.setBottleData}/>
        <CategoryContainer />
        <DescriptionContainer bottleData={props.bottleData} setBottleData={props.setBottleData} />
        <SettingContainer bottleData={props.bottleData} setBottleData={props.setBottleData} />
        <PhotosContainer bottleData={props.bottleData} setBottleData={props.setBottleData} />
    </form>
})