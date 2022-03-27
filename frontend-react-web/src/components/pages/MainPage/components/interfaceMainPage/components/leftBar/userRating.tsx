import React from "react";

type TProps = {
    rating: number
}

export const UserRating:React.FC<TProps> = React.memo((props) => {
    //пока что так
    return <div className="left-bar-map-header-rating">
        {props.rating}
    </div>
})