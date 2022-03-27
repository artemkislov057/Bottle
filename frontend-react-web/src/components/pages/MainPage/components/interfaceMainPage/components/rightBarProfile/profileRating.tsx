import React from "react";
import { UserRating } from "../leftBar/userRating";
import { RatingStar } from "./ratingStart";

type TProps = {
    rating: number
}

export const ProfileRatingContainer:React.FC<TProps> = React.memo((props) => {
    return <div className="profile-map-body-rating">
        <UserRating rating={props.rating} />
        <div className="profile-map-body-rating-stars">	
            <RatingStar addClass=""/>
            <RatingStar addClass=""/>
            <RatingStar addClass=""/>
            <RatingStar addClass=""/>
            <RatingStar addClass="half"/>
        </div>            
    </div>
})