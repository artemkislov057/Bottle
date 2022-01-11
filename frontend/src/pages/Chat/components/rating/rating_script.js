import '../../../../connections/hystModal/hystmodal.min';
import '../../../../connections/hystModal/hystmodal.min.css';
import './rating_style.css';

let myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});

let ratingButtons = document.querySelectorAll('.emoji');

export function sendRate(dialogId) {
    myModal.open('#endChatRatingPartner');    

    for(let button of ratingButtons) {
        let fuck = function eventClickFunc(e) {
            console.log(dialogId);
            fetch(`https://localhost:44358/api/dialogs/${dialogId}/rating`, { 
                method: 'POST',        
                credentials: 'include',
                body: button.value,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                myModal.close();
                for(let element of ratingButtons) {
                    console.log(element.eventData, 'delete блять')
                    element.removeEventListener('click', element.eventData);
                }
            })
        }

        button.eventData = fuck;
        button.addEventListener('click', fuck);
    }
}




