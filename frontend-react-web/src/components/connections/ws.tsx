// let ws = new WebSocket('wss:/localhost:44358/ws');

// const WebSockets = () => {
//     ws.onopen = () => {
//         ws.send(JSON.stringify({
//             lat:56.85,
//             lng: 60.6,
//             radius: 100
//         }))
//     }
// }

// export {WebSockets, ws}

export class Ws {
    ws: WebSocket;

    constructor() {
        this.ws = new WebSocket('wss:/localhost:44358/ws');
    }

    WebSokets() {
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({
                lat:56.85,
                lng: 60.6,
                radius: 100
            }))
        }
    }

    updateCoordinates(lat: number, lng: number) {
        this.ws.send(JSON.stringify({
            lat: lat,
            lng: lng,
            radius: 100
        }))
    }
}
