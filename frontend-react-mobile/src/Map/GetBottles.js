import {serverUrl} from "../../AppSetting";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function GetBottles() {
    let response = await fetch(serverUrl + 'api/bottles', {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Cookie': await AsyncStorage.getItem('cookie')
        }
    });
    return await response.json();
}
