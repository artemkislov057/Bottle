import React from "react";

type TProps = {
    price: number
    count: number
    discount: number
    type: string
}

export const BottlesCard:React.FC<TProps> = React.memo((props) => {
    return <div className="commerc-part-data-side-bottles-info-buy-card">
        <div className={`commerc-part-data-side-bottles-info-buy-card-icon ${props.type}`}></div>
        <div className="commerc-part-data-side-bottles-info-buy-card-info-and-button-container">
            <div className="commerc-part-data-side-bottles-info-buy-card-price-and-count">
                {props.price} &#8381;/{props.count}шт
            </div>
            <button className="commerc-part-data-side-bottles-info-buy-card-try-button">Попробовать</button>
        </div>
    </div>
})