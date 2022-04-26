import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import Map from "./src/Map/Map";
import Login from './src/Login/Login'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from "@react-navigation/drawer";


const Drawer = createDrawerNavigator();

export default function App() {
    Login().then(l => l);
    return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName = "Home" useLegacyImplementation={true}>
                    <Drawer.Screen name="Home" component={Map} options={{headerShown: false}} />
                </Drawer.Navigator>
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

