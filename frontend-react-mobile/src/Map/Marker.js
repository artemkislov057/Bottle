const {Callout, Marker} = require("react-native-maps");
const {View} = require("react-native");

export default function PutMarker(props){
    if(props.category === "meeting"){
        return(
            <Marker
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude
                }}
                image={require('../Map/Images/MeetingBottleIcon.png')}
            />
        )
    }
    if(props.category === "sells"){
        return(
            <Marker
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude
                }}
                image={require('../Map/Images/SellsBottleIcon.png')}
            />
        )
    }
    if(props.category === "sport"){
        return(
            <Marker
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude
                }}
                image={require('../Map/Images/SportBottleIcon.png')}
            />
        )
    }
    if(props.category === "party"){
        return(
            <Marker
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude
                }}
                image={require('../Map/Images/PartyBottleIcon.png')}
            />
        )
    }
    if(props.category === "other"){
        return(
            <Marker
                coordinate={{
                    latitude: props.latitude,
                    longitude: props.longitude
                }}
                image={require('../Map/Images/OtherBottleIcon.png')}
            />
        )
    }
}