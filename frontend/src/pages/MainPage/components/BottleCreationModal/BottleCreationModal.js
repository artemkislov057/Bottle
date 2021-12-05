import { Bottle } from "../Bottle/Bottle";

export function getBottleCreationModal() {
    let myModal = new HystModal({
        linkAttributeName: "data-hystmodal",
        //settings (optional). see Configuration
    });
    
    let modal_window = document.querySelector('.modal-window');
    let modal_h = document.querySelector('.modal-h');
    let modal_categories = document.querySelector('.modal-categories');
    let modal_adress = document.querySelector('.modal-adress');
    let modal_description = document.querySelector('.modal-description');
    let modal_create_button = document.querySelector('.modal-window-exit-button');
    
    let marker_create_bottle;
    
    let create_modal_window_button = document.querySelector('.new-bottle');
    let profileButton = document.querySelector('.profile');
    let chatButton = document.querySelector('.chat');
    
    let userImageList = document.querySelector('.modal-user-image-list');
    let divUserImage = document.querySelector('.modal-window-user-image');
    let addUserImageInput = document.querySelector('.modal-user-input-image');
    
    create_modal_window_button.addEventListener('click', () => {
        mymap.closePopup();
    });

    modal_window.addEventListener('submit', (event) => {
        event.preventDefault();

        setVisibilityButtons("hidden");
        myModal.close();

        let quest_marker = false;
        let once_click_on_map_flag = true;
    
        createBackButton(quest_marker, once_click_on_map_flag);
    
        mymap.addEventListener('click', (e) => {
            if(!once_click_on_map_flag) return;
    
            var params = {		
                format: 'jsonv2',
                lat: e.latlng.lat,
                lon: e.latlng.lng,			
            };        
            //поиск места по координатам
            let url = 'https://nominatim.openstreetmap.org/reverse'+ L.Util.getParamString(params);
            
            fetch(url)
            .then(res => res.json()).then(result => {            
                let name = result.name;
                let adress = `${result.address.city} ${result.address.road} ${result.address.house_number}`;
    
                let quest_div = create_quest_div_popup(name, adress);
                
                quest_marker = L.marker(e.latlng);
                quest_marker.addTo(mymap).bindPopup(quest_div).openPopup();            
                once_click_on_map_flag = false;
    
                let quest_yes_button = document.querySelector('.quest-yes-button');
                let quest_no_button = document.querySelector('.quest-no-button');
                quest_yes_button.addEventListener('click', () => {
                    mymap.removeLayer(quest_marker);
    
                    let newIcon = L.icon({
                        iconUrl: blueMarker,
                        iconSize: [50, 50],    
                    });
                    
                    console.log(event)
    
                    let a = fetch('https://localhost:44358/api/bottles', {
                        method: 'POST',
                        body: JSON.stringify({
                            lat: e.latlng.lat,
                            lng: e.latlng.lng,
                            title: modal_h.value,                
                            geoObjectName: name,
                            address: adress,
                            description: modal_description.value,
                            category: "Пока в разработке эти категории...",//
                            lifeTime: 10000//    
                        }),
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'            
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            new Bottle(res.id, "Пока в разработке эти категории...", e.latlng, newIcon, name, adress, modal_h.value, modal_description.value);
                            bottleIdOnMap.push(res.id);
                            resetValues();
                            once_click_on_map_flag = false;
                            setVisibilityButtons("visible");
                            back_button.style.display = "none";     
                        })
                })
    
                quest_no_button.addEventListener('click', () => {
                    mymap.removeLayer(quest_marker);
                    once_click_on_map_flag = true;                
                })
            })
        });

    });
}

function setVisibilityButtons(visibility) {
    let create_modal_window_button = document.querySelector('.new-bottle');
    let profileButton = document.querySelector('.profile');
    let chatButton = document.querySelector('.chat');

    create_modal_window_button.style.visibility = visibility;
    profileButton.style.visibility = visibility;
    chatButton.style.visibility = visibility;
}

function resetValues() {
    let modal_h = document.querySelector('.modal-h');
    let modal_description = document.querySelector('.modal-description');
    let userImageList = document.querySelector('.modal-user-image-list');
    let addUserImageInput = document.querySelector('.modal-user-input-image');

    modal_h.value = "";
    modal_description.value = "";
    userImageList.innerHTML = "";
    addUserImageInput.value = '';
}

function createBackButton(once_click_on_map_flag, quest_marker) {
    let back_button = document.querySelector('.back-to-not-create');
    back_button.style.display = "block";

    back_button.addEventListener('click', () => {
        once_click_on_map_flag = false;
        back_button.style.display = "none";
        setVisibilityButtons("visible");
        resetValues();
        if(quest_marker) mymap.removeLayer(quest_marker);
    })
}

function create_quest_div_popup(name, adress) {
    let quest_div = document.createElement('div');
    quest_div.classList = 'quest-window';

    let quest_p = document.createElement('p');
    quest_p.classList = 'quest-text';
    quest_p.textContent = `Хотите тут создать бутылочку? (${check_name_adress(name, adress)})`;

    let quest_yes_button = document.createElement('button');
    quest_yes_button.classList = 'quest-yes-button';
    quest_yes_button.textContent = "Да";

    let quest_no_button = document.createElement('button');
    quest_no_button.classList = 'quest-no-button';
    quest_no_button.textContent = "Нет";

    quest_div.appendChild(quest_p);
    quest_div.appendChild(quest_yes_button);
    quest_div.appendChild(quest_no_button);

    return quest_div;    
}