import './MainPage.css';
import '../../../hystmodal.min.css';
import '../../../Control.OSMGeocoder';
import '../../../hystmodal.min';
import blueMarker from '../../../dist/img/marker_siniy.svg';
import docIcon from '../../../dist/img/faylikonka.svg';
import { Bottle } from './components/Bottle/Bottle';
import { getBottleCreationModal } from './components/BottleCreationModal/BottleCreationModal';


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

let bottleIdOnMap = []

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
const bottleCreationModal = getBottleCreationModal();

//получение всех бутылок на карте
fetch('https://localhost:44358/api/bottles', {   
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'            
    }
})
.then(res => res.json())
.then(res => {
    let newIcon = L.icon({
        iconUrl: blueMarker,
        iconSize: [50, 50],    
    });
    for(let e of res){            
        if(!(e.id in bottleIdOnMap)) {
            // console.log(e)
            new Bottle(e.id, "Да..", [e.lat, e.lng], newIcon, e.geoObjectName, e.address, e.title, e.description, false);
            bottleIdOnMap.push(e.id)            
            
        }
    }
})

//обновление инфы о бутылках
let ws = new WebSocket('wss:/localhost:44358/ws')

ws.onopen = function() {
    ws.send(JSON.stringify({
        lat:56.85,//
        lng: 60.6,
        radius: 100//
    }))
}

ws.onmessage = function(e) {
    // console.log(JSON.parse(e.data))
    if(JSON.parse(e.data).eventNumber == 3) {
        let newIcon = L.icon({
            iconUrl: blueMarker,
            iconSize: [50, 50],    
        });
        let bottleData = JSON.parse(e.data).model;
        if(!(bottleData.id in bottleIdOnMap)) {
            new Bottle(bottleData.id, "Да..", [bottleData.lat, bottleData.lng], newIcon, bottleData.geoObjectName, bottleData.address, bottleData.title, bottleData.description, false);
            bottleIdOnMap.push(e.id)        
        }
    }
}

addUserImageInput = document.querySelector('.modal-user-input-image');

//обработка файлов из модалки создания бутылки
addUserImageInput.addEventListener('change', (evt) => {
    // divUserImage.style.display = 'block';
    let files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {

      // Only process image files.
    //   if (!f.type.match('image.*')) {
    //     continue;
    //   }

      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
            let span = document.createElement('span');
            if (f.type.match('image.*')) {                
                span.innerHTML = ['<img class="user-image" src="', e.target.result,
                                    '" title="', escape(theFile.name), '"/>'].join('');               
            } else {                
                let div = document.createElement('div');
                span.appendChild(div);
                let img = document.createElement('img');
                img.classList = 'user-image';
                img.src = docIcon;
                div.appendChild(img);
            }

            document.querySelector('.modal-user-image-list').insertBefore(span, null);
            let p = document.createElement('p');
        
            if(theFile.name.length > 10)
                p.textContent = theFile.name.substring(0,10)+'...';
            else p.textContent = theFile.name;
            span.appendChild(p)

            let btn = document.createElement('button');
            btn.classList = 'modal-user-image-delete-button';
            btn.type = 'button';
            
            span.appendChild(btn);
            btn.addEventListener('click', () => {
                userImageList.removeChild(span)
            })
            console.log(theFile)
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
}, false)


let fuckApi = {
    "nickname": "fuck",
    "password": "string",
    "email": "fuck",
    "sex": "string",
    "commercialData": {
      "fullName": "string",
      "company": "string",
      "identificationNumber": "string",
      "psrn": "string"
    }
  }

let fuckApi2 = {
    nickname: "fuck",
    password: "string",
    email: "fuck",
    sex: "string",
    commercialData: {
        fullName: "string",
        company: "string",
        identificationNumber: "string",
        psrn: "string"
    }
}

let logFuckApi2 = {
    nickname: "fuck",
    email: "fuck",
    password: "string",
}

let fuckApi3 = {
    nickname: "fuck3",
    password: "string",
    email: "fuck3",
    sex: "string",
    commercialData: {
        fullName: "string",
        company: "string",
        identificationNumber: "string",
        psrn: "string"
    }
}

let logFuckApi3 = {
    nickname: "fuck3",
    email: "fuck3",
    password: "string",
}


//#region 
// let obj = {
//     "fullName": "string",
//     "company": "string",
//     "identificationNumber": "string",
//     "psrn": "string"
//   };

// let fuck2 = new FormData();
// fuck2.append('Nickname', 'fuck11');
// fuck2.append('Email', 'fuckYouu');
// fuck2.append('password', '1111');
// fuck2.append('sex', 'вертолет');
// fuck2.append('commercialData.fullname', 'jjj');
// fuck2.append('commercialData.company', 'jjj');
// fuck2.append('commercialData.identificationNumber', 'jjj');
// fuck2.append('commercialData.psrn', 'jjj');

// let fuck3 = new FormData();
// fuck3.append('Nickname', 'fuck11');
// fuck3.append('Email', 'fuckYouu');
// fuck3.append('password', '1111');
//#endregion

//вход в акк, временно на кнопке чата, чтобы зарегаться - убрать login
chatButton.addEventListener('click', () => {
    console.log('click')
    fetch('https://localhost:44358/api/account/login', {
        method: 'POST',        
        body: JSON.stringify(logFuckApi3),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            //#region 
            // 'Access-Control-Allow-Origin': '*',
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",            
            // 'Content-Type': 'multipart/form-data'
            //#endregion
          }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
//#region 
    // fetch('https://localhost:44358/api/account', {
    //     // method: 'POST',        
    //     // body: JSON.stringify(fuckApi3),
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/json'
    //       }
    // })
    // .then(res => res.json())
    // .then(res => {
    //     console.log(res)
    // })
//     fetch('https://localhost:44358/ws/event-types', {               
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json'
//           }
//     })
//     .then(res => res.json())
//     .then(res => {
//         console.log(res)
//     })
//#endregion
})


    


