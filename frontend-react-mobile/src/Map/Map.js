import * as React from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import PutMarker from "./Marker";


export default function Map() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.824,
                    longitude: 60.621,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <PutMarker latitude='56.824' longitude = '60.621' />
                <PutMarker latitude='56.852' longitude='60.654' />
            </MapView>
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
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});