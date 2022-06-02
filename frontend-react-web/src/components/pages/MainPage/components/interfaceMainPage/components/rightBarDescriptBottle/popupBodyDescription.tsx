import React, { useContext, useEffect, useState } from "react";
import { JsxElement } from "typescript";


type TProps = {
    description: string,
    content: string[],
    bottleId: number
}

export const BodyDescription:React.FC<TProps> = React.memo((props) => {
    const [content, setContent] = useState(<></>);
    const [scaledPhoto, setScaledPhoto] = useState<JSX.Element>();

    function scalePhoto(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let el = e.target as HTMLImageElement;        
        
        console.log(el.src)

        let top = window.innerHeight / 2 - el.clientHeight / 2 + 'px';
        let left = window.innerWidth / 2 - el.clientWidth / 2 + 'px';
        let scale = 4;
        if(window.innerWidth < 700)
            scale = 2;
        
        setScaledPhoto(<img 
            src={el.src} 
            alt='Изображение из записки' 
            className="right-bar-map-popup-body-description-content-photo-dublicate"
            style={{top: top, left: left, position: 'fixed', transform: `scale(${scale})`}}
        />);
        
        
        // el.classList.add('scaled');
        // el.style.top = window.innerHeight / 2 - el.clientHeight / 2 + 'px';
        // el.style.left = window.innerWidth / 2 - el.clientWidth / 2 + 'px';

    }

    function blur(e: React.FocusEvent<HTMLDivElement>) {
        let el = e.target as HTMLElement;
        // el.classList.remove('scaled');

        setScaledPhoto(<></>);
    }
    
    useEffect(() => {
        if(props.content[0]) {
            setContent(
                <div className="right-bar-map-popup-body-description-content" onWheel={e => document.querySelector('.right-bar-map-popup-body-description-content').scrollLeft += e.deltaY / 4}>
                    {props.content.map((data, index) => 
                        <div key={data+index} className="right-bar-map-popup-body-description-content-container" 
                            // onClick={(e) => scalePhoto(e)} tabIndex={0} onBlur={(e) => blur(e)}
                        >
                            <img className="right-bar-map-popup-body-description-content-photo" src={data} alt="фотография"  onClick={(e) => scalePhoto(e)} tabIndex={0} onBlur={(e) => blur(e)}/>
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
        {scaledPhoto}
        <div className="right-bar-map-popup-body-description-text">
            {props.description}
        </div>
        {content}
        
    </div>
})