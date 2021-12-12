import { ws } from '../../../../connections/ws';
import { bottleDataOnMap, bottleIdOnMap} from '../../MainPage';
import { Bottle } from '../Bottle/Bottle';
import blueMarker from '../../../../../dist/img/marker_siniy.svg';
import yellowMarker from '../../../../../dist/img/marker_zhelty.svg';

export {
    getAllBottles
}

function getAllBottles() {
    fetch('https://localhost:44358/api/bottles', {   
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'            
        }
    })
    .then(res => res.json())
    .then(res => {
        let blueIcon = L.icon({
            iconUrl: blueMarker,
            iconSize: [50, 50],    
        });
        let yellowIcon2 = L.icon({
            iconUrl: yellowMarker,
            iconSize: [50, 50],    
        });
        for(let e of res){            
            if(!(bottleIdOnMap.includes(e.id))) {
                // console.log(e)
                // new Bottle(e.id, e.category, [e.lat, e.lng], newIcon, e.geoObjectName, e.address, e.title, e.description, false);
                if(e.category == 'Тусовки') {
                    new Bottle(e.id, e.category, [e.lat, e.lng], yellowIcon2, e.geoObjectName, e.address, e.title, e.description, false);
                } else {
                    new Bottle(e.id, e.category, [e.lat, e.lng], blueIcon, e.geoObjectName, e.address, e.title, e.description, false);
                }
                
                bottleIdOnMap.push(e.id);
                bottleDataOnMap.push(e);
            }
        }
    })
}

ws.onmessage = function(e) {
    console.log(JSON.parse(e.data))
    if(JSON.parse(e.data).eventNumber == 3) {
        let newIcon = L.icon({
            iconUrl: blueMarker,
            iconSize: [50, 50],    
        });
        let markers = [
            L.icon({
                iconUrl: blueMarker,
                iconSize: [50, 50],    
            }),
            L.icon({
                iconUrl: yellowMarker,
                iconSize: [50, 50],    
            })
        ]
        let randIcon = markers[Math.floor(Math.random()*markers.length)]
        let bottleData = JSON.parse(e.data).model;
        if(!(bottleIdOnMap.includes(bottleData.id))) {
            new Bottle(bottleData.id, bottleData.category, [bottleData.lat, bottleData.lng], randIcon, bottleData.geoObjectName, bottleData.address, bottleData.title, bottleData.description, false);
            bottleIdOnMap.push(bottleData.id);
            bottleDataOnMap.push(bottleData);
            console.log("on ws")
        }
    }
}