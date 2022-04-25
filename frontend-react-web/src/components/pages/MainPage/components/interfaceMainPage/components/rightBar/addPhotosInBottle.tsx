import React from "react";

type TProps = {
    onAddPhoto: Function
}

export const AddPhotoButton:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-add-photos">
        <label className="right-bar-map-add-photos-help-title" htmlFor="add-photos-input"></label>
        <input className="right-bar-map-add-photos-input" id="add-photos-input" type={"file"} onChange={e => props.onAddPhoto(e)} multiple/>
    </div>
})