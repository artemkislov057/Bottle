import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import React, { useState } from "react";
import { AddPhotoButton } from "./addPhotosInBottle";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const PhotosContainer:React.FC<TProps> = React.memo((props) => {
    let init : Array<string>;
    let [photos, setPhotos] = useState(init)

    function onAddPhoto(e: React.ChangeEvent<HTMLInputElement>) {
        let photo = e.target.files[0];
        let fr = new FileReader();
        fr.readAsDataURL(photo);
        
        fr.onload = (event) => {
            if(!photos) {
                setPhotos([event.target.result.toString()]);
            } else {
                setPhotos([...photos, event.target.result.toString()]);
                
            }
        }

        if(props.bottleData.content) {
            props.setBottleData({...props.bottleData, content: [...props.bottleData.content, photo]});
        } else {
            props.setBottleData({...props.bottleData, content: [photo]});
        }
        console.log(props.bottleData?.content)

        
    }

    return <div className="right-bar-map-photos-container">
        <label className="right-bar-map-photos-title">Фотографии</label>
        <div className="right-bar-map-photos-add-buttons-container">
            <AddPhotoButton onAddPhoto={onAddPhoto}/>
            <div className="right-bar-map-photos-add-photos">
                {photos?.map(photo => <img key={photo} src={photo} className="right-bar-map-photos-add-photo" alt="контент" />)}
            </div>
        </div>
    </div>
})