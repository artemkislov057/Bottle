import './ChatPageStyle.css';
import { ws } from '../../connections/ws';
import { getDialogues } from './dialogues';
import { dialoguesContainer } from './dialogues';
import './components/endChat/chat_script';
import './components/rating/rating_script';
import { sendRate } from './components/rating/rating_script';

import "regenerator-runtime/runtime";

export {
    currentDialog,
    getAllMessageInDialog
}

getDialogues().then(() => getAllMessageInDialog());

document.querySelector('.return-map-button').addEventListener('click', () => {
    document.location ='./MainPage.html';
})

const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
let topPanel = document.querySelector('.top-panel');
let currentChatId;
let currentUserId;
let currentDialog;

fetch('https://localhost:44358/api/account', {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
}).then(res => res.json()).then(res => currentUserId = res.id);

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if(currentChatId && message.trim().length) {
        fetch(`https://localhost:44358/api/dialogs/${currentChatId}`, { 
            method: 'POST',        
            credentials: 'include',
            body: JSON.stringify(message),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            writeSelfMessage(`${message}`);
            updateLastMessageInPrevDialog(currentChatId, message);
        })
        // .then(res => console.log(res))
        
    }
    messageInput.value = ''
})

function writeSelfMessage(message) {//message in right side from self
    const messageBlock = document.createElement('li')
    messageBlock.className = "message-send-block"
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.className = "message-send"
    messageBlock.append(messageElement)
    messageContainer.append(messageBlock)
    messageBlock.scrollIntoView()
}

function writePartnerMessage(message) {//message in left side from partner
    const messageBlock = document.createElement('li')
    messageBlock.className = "message-receive-block"
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.className = "message-receive"
    messageBlock.append(messageElement)
    messageContainer.append(messageBlock)
    messageBlock.scrollIntoView()
}

function getAllMessageInDialog() {
    let dialogs = document.querySelectorAll('.dialogue-block');
    console.log(dialogs)
    for(let dialog of dialogs) {        
        dialog.addEventListener('click', () => {
            currentDialog = dialog
            console.log('click');
            messageInput.disabled = false;       
            currentChatId = dialog.data.chatId
            fetch(`https://localhost:44358/api/dialogs/${dialog.data.chatId}/messages`, { 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(res => {
                for(let message of res) {
                    if(message.senderId == currentUserId) {
                        writeSelfMessage(message.value);
                    } else {
                        writePartnerMessage(message.value);
                    }
                }
            })
        })
        if(localStorage['openDialog'] == dialog.data.chatId) {
            localStorage.removeItem('openDialog');
            dialog.click();
        }
    }
}

ws.onmessage = function(e) {
    console.log(JSON.parse(e.data))
    if(JSON.parse(e.data).eventNumber == 1) {//new message
        let messageData = JSON.parse(e.data).model;
        if(currentChatId == messageData.dialogId) {
            if(messageData.senderId == currentUserId) {            
                writeSelfMessage(messageData.value);
            } else {
                writePartnerMessage(messageData.value);
            }            
        }
        updateLastMessageInPrevDialog(messageData.dialogId, messageData.value);
    }
    if(JSON.parse(e.data).eventNumber == 2) {//close dialog
        let closeDialogData = JSON.parse(e.data).model;
        console.log(closeDialogData.id, 'on socket')
        sendRate(closeDialogData.id)
        dialoguesContainer.textContent = '';
        messageContainer.textContent = '';
        topPanel.textContent = '';
        currentDialog = undefined;
        getDialogues().then(() => getAllMessageInDialog());
    }
    if(JSON.parse(e.data).eventNumber == 4) {//create dialog
        dialoguesContainer.textContent = '';
        getDialogues().then(() => getAllMessageInDialog());
    }
}

function updateLastMessageInPrevDialog(chatId, message) {
    // console.log(messageData.dialogId);
    // let dialogs = document.querySelectorAll('.dialogue-block');
    // console.log(dialogs[0].data);
    let pLastArray = document.querySelectorAll('.dialog-button-last-mess');
    for(let e of pLastArray) {
        if(chatId == e.parentElement.parentElement.parentElement.data.chatId) {
            e.textContent = message;
            break;
        }
    }
    // console.log(pLastArray[0].parentElement.parentElement.parentElement.data.chatId)
}