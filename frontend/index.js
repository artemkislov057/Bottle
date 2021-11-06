let mymap = L.map('mapid').setView([56.85, 60.6], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //описание авторских прав и тп
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    //токен, сейчас общедоступный
    accessToken: 'pk.eyJ1IjoiZGltYXNpa2J1cmRpbiIsImEiOiJja3VyNm5vNzEwb2N1Mm5xdnVmY2F2NmZkIn0.m48LWgVP-vrcXmP0r-oiBQ'
}).addTo(mymap);

let myIcon = L.icon({
    iconUrl: "./test-icon.png",
    iconSize: [50, 50],    
});

//создание кастомной иконки с привязкой класса
// let iconn = L.divIcon({ 
//     className: 'test-icon',    
// });


//отображение маркера при клике
// mymap.addEventListener('click', (e) => {    
//     // L.marker(e.latlng, {icon: myIcon}).addTo(mymap).bindPopup("<b>QQ</b>").openPopup();

//     let div = document.createElement('div');
//     div.classList = 'marker-info';

//     let h = document.createElement('h2');
//     div.appendChild(h);

//     let p = document.createElement('p');
//     p.classList = 'marker-info-street';
//     div.appendChild(p);

//     let div2 = document.createElement('div');
//     div2.classList = 'marker-info-field';

//     let p2 = document.createElement('p');
//     p2.classList = 'marker-info-field-des'
//     div2.appendChild(p2);

//     let div3 = document.createElement('div');
//     div3.classList = 'marker-info-field-image';
//     div2.appendChild(div3);

//     let image = document.createElement('img');
//     image.classList = 'marker-info-field-image';
//     div3.appendChild(image);

//     let image1 = document.createElement('img');
//     image1.classList = 'marker-info-field-image';
//     div3.appendChild(image1);

//     div.appendChild(div2);

//     let btn = document.createElement('button');
//     btn.classList = 'marker-info-button';

//     div.appendChild(btn);

//     //в будущем всю инфу брать из бд(?)
//     h.textContent = 'Заголовок';
//     p.textContent = 'Улица ###';
//     p2.textContent = 'Информация о маркере Информация о маркере Информация о маркере Информация о маркере';
//     image.src = 'test-icon2.jpg';
//     image1.src = 'test-icon2.jpg';
//     btn.textContent = 'К диалогу';

//     L.marker(e.latlng, {icon: myIcon}).addTo(mymap).bindPopup(div).openPopup();
// })


//поиск по адресам
let osmGeocoder = new L.Control.OSMGeocoder();
mymap.addControl(osmGeocoder);

let input = document.querySelector('.search-form');
let input_field = document.querySelector('.search-field');
let submit_button = document.querySelector('.geo-submit');
let geo_input = document.querySelector('.geo-input');

let marker_search;
input.addEventListener('submit', (e) => {
    e.preventDefault();
    geo_input.value = input_field.value;

    if(marker_search)
        mymap.removeLayer(marker_search);
    
    
    osmGeocoder._geocode(e).then(results => {
        if (results.length == 0) {
            console.log("ERROR: didn't find a result");
            return;
        }

        let bbox = results[0].boundingbox,
            first = new L.LatLng(bbox[0], bbox[2]),
            second = new L.LatLng(bbox[1], bbox[3]),
            bounds = new L.LatLngBounds([first, second]);
        
        mymap.fitBounds(bounds);

        let lat = results[0].lat;
        let lon = results[0].lon;        
                
        marker_search = L.marker(new L.LatLng(lat, lon));
        marker_search.addTo(mymap);
    })
    // submit_button.click();
})

mymap.addEventListener('click', () => {
    if(marker_search)
        mymap.removeLayer(marker_search);
})

//подключение модалки
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

modal_window.addEventListener('submit', (event) => {
    event.preventDefault();

    //обнуляем у кнопки создания модалки data- атрибут, чтобы во время ожидания выбора м/п-ния метки не открывать заново создание бутылки
    //из за этого если нажать на кнопку во время ожидания -> ошибка в консоль
    create_modal_window_button.dataset.hystmodal = "";
    
    myModal.close();//обнулить все поля

    let quest_marker;
    let once_click_on_map_flag = true;

    let back_button = document.querySelector('.back-to-not-create');
    back_button.style.display = "block";
    back_button.addEventListener('click', () => {
        once_click_on_map_flag = false;
        back_button.style.display = "none";
        create_modal_window_button.dataset.hystmodal = "#myModal";
        modal_h.value = "";
        modal_description.value = "";
        if(quest_marker) mymap.removeLayer(quest_marker);
    })

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

                let div = create_div_popup(name, adress);

                marker_create_bottle = L.marker(e.latlng, {icon: myIcon});
                marker_create_bottle.addTo(mymap).bindPopup(div).openPopup();

                modal_h.value = "";
                modal_description.value = "";

                once_click_on_map_flag = false;

                create_modal_window_button.dataset.hystmodal = "#myModal";

                back_button.style.display = "none";
            })

            quest_no_button.addEventListener('click', () => {
                mymap.removeLayer(quest_marker);
                once_click_on_map_flag = true;                
            })
        })
    });
})


function create_div_popup(name, adress) {
    let div = document.createElement('div');
    div.classList = 'marker-info';

    let h = document.createElement('h2');
    div.appendChild(h);

    let p = document.createElement('p');
    p.classList = 'marker-info-street';
    div.appendChild(p);

    let div2 = document.createElement('div');
    div2.classList = 'marker-info-field';

    let p2 = document.createElement('text-area');
    p2.classList = 'marker-info-field-des'
    div2.appendChild(p2);

    let div3 = document.createElement('div');
    div3.classList = 'marker-info-field-image';
    div2.appendChild(div3);

    let image = document.createElement('img');
    image.classList = 'marker-info-field-image';
    div3.appendChild(image);

    let image1 = document.createElement('img');
    image1.classList = 'marker-info-field-image';
    div3.appendChild(image1);

    div.appendChild(div2);

    let btn = document.createElement('button');
    btn.classList = 'marker-info-button';
    div.appendChild(btn);
    
    h.textContent = modal_h.value;
    p.textContent = check_name_adress(name, adress);
    p2.textContent = modal_description.value;
    image.src = 'test-icon2.jpg';//
    image1.src = 'test-icon2.jpg';//
    btn.textContent = 'К диалогу';

    return div;
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

function check_name_adress(name, adress) {
    let adress_parts = adress.split(' ').filter(x => x != 'undefined' && x != 'null').join(' ');
    return name && adress ? `${name}, ${adress_parts}` : !name && adress ? adress_parts : name && !adress ? name : "";
}

// let leaflet = require('./node_modules/leaflet');
// console.log(leaflet)
let a = 10;