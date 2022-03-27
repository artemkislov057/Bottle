import React from "react";

type TProps = {
    onClick: Function,
    title: string
}

export const RightBarFooter:React.FC<TProps> = React.memo((props) => {
    return <div className="right-bar-map-footer">
        <button className="right-bar-map-footer-on-map-button">{props.title}</button>
    </div>
})