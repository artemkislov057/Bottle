import React from "react";
import './closeDialogQuestModal.css';
import closeIcon from './closeImageQuestCloseDialogIcon.svg';

export const CloseDialogQuestModal:React.FC = React.memo(() => {
    return <div className="chat-page-close-dialog-quest-modal-container">
        <div className="chat-page-close-dialog-quest-modal">
            <img className="chat-page-close-dialog-quest-modal-image" alt="крестик" src={closeIcon} />
            <div className="chat-page-close-dialog-quest-modal-text">
                <span className="chat-page-close-dialog-quest-modal-quest">
                    Вы уверены, что хотите завершить общение?
                </span>
                <span className="chat-page-close-dialog-quest-modal-caption">
                    После закрытия данного окна вы больше не сможете вернуться к диалогу
                </span>
            </div>
            <div className="chat-page-close-dialog-quest-modal-buttons">
                <button className="chat-page-close-dialog-quest-modal-stay-button">Остаться</button>
                <button className="chat-page-close-dialog-quest-modal-close-button">Завершить</button>
            </div>
        </div>
    </div>
})