import React from "react";

type TProps = {
    rating: number,
    width?: string | '60px' ,
    fontSize?: string | '23px'
}

export const UserRating:React.FC<TProps> = React.memo((props) => {
    //пока что так
    return <div className="left-bar-map-header-rating" 
        style={{width:props.width, minWidth:props.width, minHeight:props.width, height:props.width, fontSize:props.fontSize}}>
        {props.rating?.toFixed(1)}
    </div>
})