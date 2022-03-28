import React, { useState } from "react";

type TProps = {
    description: string,
    content: string[]
}

export const BodyDescription:React.FC<TProps> = React.memo((props) => {    
    return <div className="right-bar-map-popup-body-description">
        <div className="right-bar-map-popup-body-description-text">
            {props.description}
        </div>
        <div className="right-bar-map-popup-body-description-content">
            {props.content.map((data, index) => 
                <img key={data+index} className="right-bar-map-popup-body-description-content-photo" src={data} alt="фотография" />
                )}            
        </div>
    </div>
})