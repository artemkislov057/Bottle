import { DataBottleDescType } from "components/pages/MainPage/DataBottleDescriptType";
import React, { useEffect, useState } from "react";
import { AddPhotoButton } from "./addPhotosInBottle";

type TProps = {
    bottleData: DataBottleDescType
    setBottleData: React.Dispatch<React.SetStateAction<DataBottleDescType>>
}

export const PhotosContainer:React.FC<TProps> = React.memo((props) => {
    let init : Array<string>;
    let [photos, setPhotos] = useState(init)

    async function onAddPhoto(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.files)
        let resCurrentPhotos = Array<string>();
        let resSendPhotos = Array<File>();
        
        let photosArray = [];

        let addPhotos = e.target.files;
        for(let i = 0; i < addPhotos.length; i++) {
            photosArray.push(addPhotos[i]);
        }
        
        let fr = new FileReader();
        
        for(let el of photosArray) {
            let currentPhoto = el;
            resSendPhotos.push(currentPhoto);
            
            fr = new FileReader()
            fr.onload = (event) => {
                 resCurrentPhotos.push(event.target.result.toString());
            }
            fr.readAsDataURL(currentPhoto);
        }
        
        fr.onloadend = e => {
            console.log('finis loaded');
            if(!photos) {
                setPhotos(resCurrentPhotos);
            } else {
                setPhotos([...photos, ...resCurrentPhotos]);                
            }
        }

        if(props.bottleData.content) {
            props.setBottleData({...props.bottleData, content: [...props.bottleData.content, ...resSendPhotos]});
        } else {
            props.setBottleData({...props.bottleData, content: resSendPhotos});
        }
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