import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Map from "./src/Map/Map";
import Login from './src/Login/Login'

export default function App() {
    Login().then(l => l);
    return(
        <View style={styles.container}>
            <Map />
            <StatusBar style="auto" />
        </View>
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
