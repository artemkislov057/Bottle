import AsyncStorage from "@react-native-async-storage/async-storage";
import {serverUrl} from "../../AppSetting";

export default async function Login() {
    let account = {
        nickname: "string",
        password: "string"
    }
    let response = await fetch(serverUrl + 'api/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(account)
    });
    let cookie = response.headers.map['set-cookie'];
    try {
        await AsyncStorage.setItem('cookie', cookie);
    }
    catch (e) {
        console.log(e);
    }
    return await response.json();
}
