import React, { useEffect, useState } from "react";
import './reviewCard.css';

type Card = {
    title: string
    imageUrl: string
    description: string
}

type TProps = {
    cards: Array<Card>    
    // firstCard: Card
    // secondCard: Card
    // thirdCard: Card
}

export const ReviewCard:React.FC<TProps> = React.memo((props) => {
    const [currentCard, setCurrentCard] = useState<{card: Card, currNumber: number}>();

    useEffect(() => {
        setCurrentCard({card: props.cards[0], currNumber: 0});        
    }, []);

    function nextCard() {
        if(!currentCard) return;
        if(currentCard?.currNumber === props.cards.length - 1) {
            setCurrentCard({card: props.cards[0], currNumber: 0})
        } else {
            setCurrentCard({card: props.cards[currentCard.currNumber + 1], currNumber: currentCard.currNumber + 1});
        }
    }

    function previousCard() {
        if(!currentCard) return;
        if(currentCard?.currNumber === 0) {
            setCurrentCard({card: props.cards[props.cards.length - 1], currNumber: props.cards.length - 1})
        } else {
            setCurrentCard({card: props.cards[currentCard.currNumber - 1], currNumber: currentCard.currNumber - 1});
        }
    }
    
    return <div className="review-card-container">
        <div className="review-card">
            <img className="review-card-image" alt="изображение к описанию" src={currentCard?.card.imageUrl} />
            <span className="review-card-title">{currentCard?.card.title}</span>
            <span className="review-card-description">{currentCard?.card.description}</span>
            <div className="review-card-navigate-container">
                <button className="review-card-navigate-button left" onClick={() => previousCard()}></button>
                <div className="review-card-navigate-dots">
                    <span className={`review-card-navigate-dot ${currentCard?.currNumber === 0 ? 'active' : null}`}></span>
                    <span className={`review-card-navigate-dot ${currentCard?.currNumber === 1 ? 'active' : null}`}></span>
                    <span className={`review-card-navigate-dot ${currentCard?.currNumber === 2 ? 'active' : null}`}></span>                
                </div>
                <button className="review-card-navigate-button right" onClick={() => nextCard()}></button>
            </div>
        </div>        
    </div>
})