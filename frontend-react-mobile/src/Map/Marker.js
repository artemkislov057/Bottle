const {Callout, Marker} = require("react-native-maps");
const {View} = require("react-native");

export default function PutMarker(props){
    return(
        <Marker
            coordinate={{
                latitude: props.latitude,
                longitude: props.longitude
            }}
            image={require('../Map/marker.png')}
        >
            <Callout>
                <View
                    style={{
                        flexDirection: "column",
                        height: 150,
                        width: 200,
                    }}
                >
                </View>
            </Callout>
        </Marker>
    )
}