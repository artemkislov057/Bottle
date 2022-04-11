const ws = new WebSocket('wss:/localhost:44358/ws');

const WebSockets = () => {
    ws.onopen = () => {
        ws.send(JSON.stringify({
            lat:56.85,
            lng: 60.6,
            radius: 100
        }))
    }
}

export {WebSockets, ws}