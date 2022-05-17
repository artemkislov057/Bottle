import React, { useEffect, useState } from "react";
import { UserRating } from "../leftBar/userRating";
import { RatingStar } from "./ratingStart";

type TProps = {
    rating: number
}

export const ProfileRatingContainer:React.FC<TProps> = React.memo((props) => {
    const [rateStars, setRateStars] = useState(Array<string>());
    useEffect(() => {
        if(!props.rating) {
            setRateStars(['empty','empty','empty','empty','empty'])
            return
        }
        let res = []

        if(Number.isInteger(props.rating)) {
            res = getStars(props.rating, false);            
        } else {
            res = getStars(Math.floor(props.rating), true);
        }
        
        setRateStars(res);
    }, [props.rating])

    function getStars(intRate: number, haveHalf: boolean) {
        let res = Array<string>();
        for(let i = 0; i < intRate; i++) {
            res.push('');
        }
        let emptyCount = 5 - intRate;
        if(haveHalf) {
            res.push('half');
            emptyCount--;
        }
        for(let i = 0; i < emptyCount; i++) {
            res.push('empty');
        }

        return res;
    }

    return <div className="profile-map-body-rating">
        <UserRating rating={props.rating} />
        <div className="profile-map-body-rating-stars">
            {rateStars.map((x, i) => 
                <RatingStar key={x + i} addClass={x}/>    
            )}            
        </div>            
    </div>
})