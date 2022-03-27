import React from "react";

type TProps = {
    addClass: string
}

export const RatingStar:React.FC<TProps> = React.memo((props) => {
    return <div className={`rating-star ${props.addClass}`}></div>
})