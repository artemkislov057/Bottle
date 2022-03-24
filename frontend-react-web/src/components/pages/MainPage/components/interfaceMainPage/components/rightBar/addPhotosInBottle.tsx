import React from "react";

export const AddPhotoButton:React.FC = React.memo(() => {
    return <div className="right-bar-map-add-photos">
        <label className="right-bar-map-add-photos-help-title" htmlFor="add-photos-input"></label>
        <input className="right-bar-map-add-photos-input" id="add-photos-input" type={"file"} />
    </div>
})