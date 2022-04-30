import { StatusBar } from 'expo-status-bar';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import Map from "./src/Map/Map";
import Login from './src/Login/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomNavigationMenu from "./src/Map/DrawerContent";
import {Poppins_400Regular, Poppins_600SemiBold} from "@expo-google-fonts/poppins";
import {useFonts} from "expo-font";
import AppLoading from "expo-app-loading";
import * as React from "react";
import {Svg, Path, G, Rect, Defs,} from "react-native-svg";
import Dialogues from "./src/Dialogues/Dialogues";
import AddBottle from "./src/Map/Components/AddBottle";



const Drawer = createDrawerNavigator();

export default function App() {
    //Login().then(l => l);
    const [fontsLoaded] = useFonts({
        Poppins_400Regular, Poppins_600SemiBold
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    useLegacyImplementation={true}
                    drawerContent={props => <CustomNavigationMenu {...props}/>}
                    screenOptions={{
                        drawerStyle: {width: '85%'},
                        drawerType: 'front',
                        swipeEdgeWidth: '35',
                    }}
                >
                    <Drawer.Screen name="Home" component={Map} options={{headerShown: false}}/>
                    <Drawer.Screen name="Dialogues" component={Dialogues} options={{headerShown: false}}/>
                    <Drawer.Screen name="AddBottleScreen" component={AddBottle} options={{headerShown: false}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

