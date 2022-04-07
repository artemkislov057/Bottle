import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import React from "react";
import { AddPhotoButton } from "./addPhotosInBottle";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const PhotosContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-photos-container">
        <label className="right-bar-map-photos-title">Фотографии</label>
        <div className="right-bar-map-photos-add-buttons-container">
            <AddPhotoButton />
        </div>
    </div>
})