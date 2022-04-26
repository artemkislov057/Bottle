import * as React from 'react';
import MapView, {Callout, Marker, Overlay} from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TextInput,
    Platform,
    Button,
    ScrollView,
    TouchableOpacity, ImageBackground
} from 'react-native';
import PutMarker from "./Marker";


export default function Map({navigation}) {
    const initialCategories = {
        categories: [
            {
                name: 'Тусовки',
            },
            {
                name: 'Знакомства',
            },
            {
                name: 'Спорт',
            },
            {
                name: 'Продажи',
            },
            {
                name: 'Прочее',
            },
        ],
    };

    const [category, setCategories] = React.useState(initialCategories);

    return (
        <View style={styles.container}>
            <MapView
                provider="google"
                style={styles.map}
                initialRegion={{
                    latitude: 56.824,
                    longitude: 60.621,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
            >
                <PutMarker latitude ={56.824} longitude ={60.621} />
                <PutMarker latitude={56.852} longitude={60.654} />
            </MapView>
            <View style = {styles.searchBoxContainer}>
                <View style={styles.leftBarButton}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.openDrawer()}>
                        <Image
                            source={require('../Map/leftBarIcon.png')}
                            style={styles.buttonImageIconStyle}
                        />
                    </TouchableOpacity>
                </View>
                <View style = {styles.searchBox}>
                    <TextInput
                        placeholder = "Search"
                        placeholderTextColor = "rgba(213, 220, 223, 0.6)"
                        autoCapitalize="none"
                        style={{flex:1,padding:0, color: 'rgba(213, 220, 223, 0.6)', fontSize: 18}}
                    />
                </View>
            </View>

            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={50}
                style={styles.categoriesScrollView}
                contentInset={{
                    top:0,
                    left:0,
                    bottom:0,
                    right:20
                }}
                contentContainerStyle={{
                    paddingRight: Platform.OS === 'android' ? 20 : 0
                }}
            >
                {category.categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryItem}>
                        {category.icon}
                        <Text>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    searchBoxContainer:{
        position:'absolute',
        marginTop: Platform.OS === 'ios' ? 40 : 20,
        flexDirection: "row",
        backgroundColor: '#212121',
        width: '90%',
        height: '6%',
        alignSelf:'center',
        borderRadius: 10,
    },
    leftBarButton:{
        alignSelf: 'center',
        marginLeft: "2%",
    },
    buttonImageIconStyle:{
        padding: 10,
        margin: 5,
        width: 16,
        height: 15,
        resizeMode: 'stretch',
    },
    searchBox: {
        alignSelf: 'center',
        backgroundColor: "#D5DCDF26",
        width: "70%",
        padding: 5,
        borderRadius: 8,
        margin: "1%",
    },
    categoriesScrollView: {
        position:'absolute',
        bottom: 20,
        paddingHorizontal:10
    },
    categoryIcon: {
        marginRight: 5,
    },
    categoryItem: {
        flexDirection:"row",
        backgroundColor:'#fff',
        borderRadius:20,
        padding:8,
        paddingHorizontal:20,
        marginHorizontal:10,
        height:35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});
