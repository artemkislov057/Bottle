import AsyncStorage from "@react-native-async-storage/async-storage";
import {serverUrl} from "../../AppSetting";

export default async function PostBottle(bottle) {
    await fetch(serverUrl + 'api/bottles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': await AsyncStorage.getItem('cookie')
        },
        body: JSON.stringify({
            lat: props.latitude,
            lng: props.longitude,
            lifeTime: 24 * 60 * 60
        })
    });
}
