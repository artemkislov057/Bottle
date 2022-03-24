import React from "react";
import { AddPhotoButton } from "./addPhotosInBottle";

export const PhotosContainer:React.FC = React.memo(() => {
    return <div className="right-bar-map-photos-container">
        <label className="right-bar-map-photos-title">Фотографии</label>
        <div className="right-bar-map-photos-add-buttons-container">
            <AddPhotoButton />
            <AddPhotoButton />            
        </div>        
    </div>
})