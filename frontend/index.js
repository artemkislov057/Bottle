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
    L.marker(e.latlng, {icon: myIcon}).addTo(mymap).bindPopup("<b>QQ</b>").openPopup();
})