import '../../../../connections/hystModal/hystmodal.min';
import '../../../../connections/hystModal/hystmodal.min.css';
import './chat_style.css';
import { currentDialog } from '../../chat';
import { dialoguesContainer } from '../../dialogues';
import { getAllMessageInDialog } from '../../chat';
import { getDialogues } from '../../dialogues';

import { sendRate } from '../rating/rating_script';//вызываем модалку оценки

const messageContainer = document.getElementById('message-container');
let topPanel = document.querySelector('.top-panel');

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});

document.querySelector('.endChat-no-button').addEventListener('click', () => {
    myModal.close();
})

let closeDialogButton = document.querySelector('.chat-close-dialog-button');
closeDialogButton.addEventListener('click', () => {
    if(currentDialog) {
        closeDialogButton.dataset.hystmodal = "#endChatModal";        
    }    
})

let yesCloseDialogButton = document.querySelector('.endChat-yes-button');
yesCloseDialogButton.addEventListener('click', () => {
    myModal.close();
    console.log(currentDialog.data.chatId, 'on client')
    sendRate(currentDialog.data.chatId)
    
    // console.log(currentDialog.data.chatId)
    fetch(`https://localhost:44358/api/dialogs/${currentDialog.data.chatId}/close`, { 
            method: 'POST',        
            credentials: 'include',            
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            dialoguesContainer.textContent = '';
            messageContainer.textContent = '';            
            getDialogues().then(() => getAllMessageInDialog());
            // myModal.close();
            topPanel.textContent = '';
            closeDialogButton.dataset.hystmodal = '';
            
        })
})