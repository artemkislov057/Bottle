import React from "react";

type TProps = {
    onClick: Function,
    title: string
}

export const RightBarFooter:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-footer">
        <button type="submit" 
            form="right-bar-map-body-form" 
            className="right-bar-map-footer-on-map-button"
            onClick={(e) => { 
                // props.onClick() 
                }}>
                {props.title}
        </button>
    </div>
})