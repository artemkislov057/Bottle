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
mymap.addEventListener('click', (e) => {    
    // L.marker(e.latlng, {icon: myIcon}).addTo(mymap).bindPopup("<b>QQ</b>").openPopup();

    let div = document.createElement('div');
    div.classList = 'marker-info';

    let h = document.createElement('h2');
    div.appendChild(h);

    let p = document.createElement('p');
    p.classList = 'marker-info-street';
    div.appendChild(p);

    let div2 = document.createElement('div');
    div2.classList = 'marker-info-field';

    let p2 = document.createElement('p');
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

    //в будущем всю инфу брать из бд(?)
    h.textContent = 'Заголовок';
    p.textContent = 'Улица ###';
    p2.textContent = 'Информация о маркере Информация о маркере Информация о маркере Информация о маркере';
    image.src = 'test-icon2.jpg';
    image1.src = 'test-icon2.jpg';
    btn.textContent = 'К диалогу';

    L.marker(e.latlng, {icon: myIcon}).addTo(mymap).bindPopup(div).openPopup();
})


//поиск по адресам
let osmGeocoder = new L.Control.OSMGeocoder();
mymap.addControl(osmGeocoder);

let input = document.querySelector('.search-form');
let input_field = document.querySelector('.search-field');
let submit_button = document.querySelector('.geo-submit');
let geo_input = document.querySelector('.geo-input');

input.addEventListener('submit', (e) => {
    e.preventDefault();    
    geo_input.value = input_field.value
    submit_button.click();
})