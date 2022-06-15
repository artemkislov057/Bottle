import React from "react";
import './ChatModal.css';
import rateIcon from './ratePartnerCloseDialogIcon.svg';

type TProps = {
    id: number,
    setRate: React.Dispatch<React.SetStateAction<{
        value: number;
        id: number;
    }>>,
    partnerName: string
}

export const ChatModal:React.FC<TProps> = React.memo((props) => {
    function onClickNumber(value: number){
        props.setRate({id: props.id, value: value});
        // console.log(value)
    }
    return <div className="chat-modal-container">
        <div className="chat-modal-window">
            <img className="chat-modal-window-icon" alt="смайлики" src={rateIcon} />
            <div className="chat-modal-window-text">
                <span className="chat-modal-window-title">
                    Пожалуйста, оцените вашего собеседника <span className="chat-modal-window-title-name">{props.partnerName}</span>
                </span>
                <span className="chat-modal-window-caption">Ваш отзыв о собеседнике помогает нам развиваться в нужном направлении</span>
            </div>            
            <div className="chat-modal-window-rate-buttons">
                <button className="chat-modal-rate-button" onClick={() => onClickNumber(1)}></button>
                <button className="chat-modal-rate-button" onClick={() => onClickNumber(2)}></button>
                <button className="chat-modal-rate-button" onClick={() => onClickNumber(3)}></button>
                <button className="chat-modal-rate-button" onClick={() => onClickNumber(4)}></button>
                <button className="chat-modal-rate-button" onClick={() => onClickNumber(5)}></button>
            </div>            
        </div>        
    </div>
})