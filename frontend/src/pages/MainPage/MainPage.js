import './MainPage.css';
import 'leaflet';
import { CreationBottlenModal } from './components/BottleCreationModal/BottleCreationModal';
import { bottleFilterOnMap } from './bottleFilter';
import { getAllBottles } from './components/GetAndUpdateBottle/getAndUpdateBottle';
import { searchAddress } from './components/SearchAddress/searchAddress';
import "regenerator-runtime/runtime";



import './components/editProfile/profile/style_profile.css'
import './components/editProfile/profile/script_profile.js'
// import './hystModal/hystmodal.min.css'
// import './hystModal/hystmodal.min.js';


//import './components/editProfile/profile/script_profile'

import '../../pages/myComercReg/modalCommercReg'


export{
    markerDataOnMap,
    bottleIdOnMap,
    bottleDataOnMap,
    mymap,
    currentUser
}

let bottleIdOnMap = [];
let bottleDataOnMap = [];
let markerDataOnMap = new Map();

let mymap = L.map('mapid').setView([56.85, 60.6], 13);//

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

new CreationBottlenModal();
getAllBottles();
searchAddress();
bottleFilterOnMap();

let currentUser;
getCurrentUser().then(res => currentUser = res)

async function getCurrentUser() {
    return await fetch('https://localhost:44358/api/account', {    
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'            
        }
    }).then(res => res.json())
}
