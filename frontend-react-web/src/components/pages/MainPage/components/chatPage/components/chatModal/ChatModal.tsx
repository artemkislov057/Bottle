import React from "react";
import './ChatModal.css';

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
    }
    return <div className="chat-modal-container">
        <div className="chat-modal-window">
            <div>Оцените {props.partnerName}</div>            
            <div className="chat-modal-window-rate-buttons">
                <button className="chate-modal-rate-button" onClick={() => onClickNumber(1)}>1</button>
                <button className="chate-modal-rate-button" onClick={() => onClickNumber(2)}>2</button>
                <button className="chate-modal-rate-button" onClick={() => onClickNumber(3)}>3</button>
                <button className="chate-modal-rate-button" onClick={() => onClickNumber(4)}>4</button>
                <button className="chate-modal-rate-button" onClick={() => onClickNumber(5)}>5</button>
            </div>            
        </div>        
    </div>
})