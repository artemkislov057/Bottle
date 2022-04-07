import React, { useEffect, useState } from "react";

type TProps = {
    description: string,
    content: string[]
}

export const BodyDescription:React.FC<TProps> = React.memo((props) => {
    const [content, setContent] = useState(<></>);   
    
    useEffect(() => {
        if(props.content) {
            setContent(
                <div className="right-bar-map-popup-body-description-content">
                    {props.content.map((data, index) => 
                        <img key={data+index} className="right-bar-map-popup-body-description-content-photo" src={data} alt="фотография" />
                        )}            
                </div>
            )
        } else {
            setContent(
                <div className="right-bar-map-popup-body-description-content" style={{justifyContent:'center', alignItems:"center"}}>
                    Здесь мог быть контент(0(
                </div>
            )
        }
    }, [])

    return <div className="right-bar-map-popup-body-description">
        <div className="right-bar-map-popup-body-description-text">
            {props.description}
        </div>
        {content}
        
    </div>
})