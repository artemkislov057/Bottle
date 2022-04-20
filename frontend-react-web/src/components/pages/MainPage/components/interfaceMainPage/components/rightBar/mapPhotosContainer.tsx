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
        console.log(photo)
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
        console.log(props.bottleData?.content);
    }

    function onDeletePhoto(photo: string) {       
        let ind = photos.indexOf(photo);
        console.log(ind)
        let tempPhotos = photos.slice()
        tempPhotos.splice(ind, 1);
        setPhotos(tempPhotos);

        //такое себе решение
        let tempSendPhotos = props.bottleData.content.slice();
        tempSendPhotos.splice(ind, 1);
        props.setBottleData({...props.bottleData, content: tempSendPhotos});
    }
    
    return <div className="right-bar-map-photos-container">
        <label className="right-bar-map-photos-title">Фотографии</label>
        <div className="right-bar-map-photos-add-buttons-container">
            <AddPhotoButton onAddPhoto={onAddPhoto}/>
            <div className="right-bar-map-photos-add-photos" onWheel={e => document.querySelector('.right-bar-map-photos-add-photos').scrollLeft += e.deltaY / 4}>
                {photos?.map(photo => 
                    <div key={photo} className="right-bar-map-photos-add-photo-container">
                        <img  src={photo} className="right-bar-map-photos-add-photo" alt="контент" />
                        <button type="button" className="right-bar-map-photos-add-photo-delete-button" onClick={() => onDeletePhoto(photo)}/>
                    </div>
                )}
            </div>
        </div>
    </div>
})