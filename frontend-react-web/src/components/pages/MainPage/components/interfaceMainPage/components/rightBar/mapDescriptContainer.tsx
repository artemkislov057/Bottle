import React from "react";

export const DescriptionContainer:React.FC = React.memo(() => {
    return <div className="right-bar-map-description-container">
        <label className="right-bar-map-description-title" htmlFor="map-description-textArea">Описание записки</label>
        <textarea className="right-bar-map-description-textArea" id="map-description-textArea"></textarea>
    </div>
})