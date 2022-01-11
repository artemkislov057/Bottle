let ws = new WebSocket('wss:/localhost:44358/ws')

ws.onopen = function() {
    ws.send(JSON.stringify({
        lat:56.85,//
        lng: 60.6,
        radius: 100//
    }))    
}

let currentLatLngDist = {
    lat:56.85,//
    lng: 60.6,
    radius: 100//
}

export {
    ws,
    currentLatLngDist
}