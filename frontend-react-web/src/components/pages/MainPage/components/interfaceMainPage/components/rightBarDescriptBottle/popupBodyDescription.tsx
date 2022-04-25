import React, { useEffect, useState } from "react";

type TProps = {
    description: string,
    content: string[],
    bottleId: number
}

export const BodyDescription:React.FC<TProps> = React.memo((props) => {
    const [content, setContent] = useState(<></>);   
    
    useEffect(() => {
        if(props.content[0]) {
            setContent(
                <div className="right-bar-map-popup-body-description-content" onWheel={e => document.querySelector('.right-bar-map-popup-body-description-content').scrollLeft += e.deltaY / 4}>
                    {props.content.map((data, index) => 
                        <div key={data+index} className="right-bar-map-popup-body-description-content-container">
                            <img className="right-bar-map-popup-body-description-content-photo" src={data} alt="фотография" />
                        </div>   
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
    }, [props.content, props.bottleId])

    return <div className="right-bar-map-popup-body-description">
        <div className="right-bar-map-popup-body-description-text">
            {props.description}
        </div>
        {content}
        
    </div>
})