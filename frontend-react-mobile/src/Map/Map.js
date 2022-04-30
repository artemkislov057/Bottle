import * as React from 'react';
import MapView from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Platform,
    ScrollView,
    TouchableOpacity,
    Image, Button
} from 'react-native';
import PutMarker from "./Marker";
import {Path, Svg} from "react-native-svg";
import {useEffect, useState} from "react";
import {serverUrl} from "../../AppSetting";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Map({navigation}) {
    // const [markersList, setMarkersList] = useState([])
    //
    // useEffect(async () => {
    //     fetch(serverUrl + 'api/bottles', {
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //             'Cookie': await AsyncStorage.getItem('cookie')
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((json) => setMarkersList(json))
    // })

    const category = {
        categories: [
            {
                icon: <Image source={require('./Images/PartiesIcon.png')} style={styles.categoryIcon}/>,
                name: 'Тусовки',
            },
            {
                icon: <Image source={require('./Images/MeetingIcon.png')} style={styles.categoryIcon}/>,
                name: 'Знакомства',
            },
            {
                icon: <Image source={require('./Images/SportIcon.png')} style={styles.categoryIcon}/>,
                name: 'Спорт',
            },
            {
                icon: <Image source={require('./Images/SellsIcon.png')} style={styles.categoryIcon}/>,
                name: 'Продажи',
            },
            {
                icon: <Image source={require('./Images/OtherCategoryIcon.png')} style={styles.categoryIcon}/>,
                name: 'Прочее',
            },
        ],
    };

    const initialRegion = {
        latitude: 56.824,
        longitude: 60.621,
        latitudeDelta: 0.0922,
        longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.00522,
    }

    return (
        <View style={styles.container}>
            <MapView
                provider="google"
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={false}
            >
                {/*{markersList.map(marker => <PutMarker latitude={marker.lat} longitude={marker.lng} category={marker.category}/>)}*/}
            </MapView>
            <View style = {styles.searchBoxContainer}>
                <View style={styles.leftBarButton}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.openDrawer()}>
                            <Svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.42339V1.84677H9H17V1.42339V1H9H1V1.42339ZM1 8.5V8.92339H9H17V8.5V8.07661H9H1V8.5ZM1 15.5766V16H9H17V15.5766V15.1532H9H1V15.5766Z" fill="#D5DCDF" stroke="#D5DCDF"/>
                            </Svg>
                    </TouchableOpacity>
                </View>
                <View style = {styles.searchBox}>
                    <TextInput
                        placeholder = "Search"
                        placeholderTextColor = "rgba(213, 220, 223, 0.6)"
                        autoCapitalize="none"
                        style={{flex:1,padding:0, color: 'rgba(213, 220, 223, 0.6)', fontSize: 14, fontFamily: 'Poppins_400Regular'}}
                    />
                </View>
                <View style={{flex:1, alignSelf: 'center', alignItems: 'center'}}>
                <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.68375 0.0778253C5.17824 0.17716 4.31417 0.478899 3.85906 0.7151C1.85629 1.75432 0.370827 3.87079 0.0513837 6.14024C-0.0512027 6.86883 0.00698161 8.34148 0.162359 8.94982C0.854158 11.6582 2.71743 13.5943 5.32062 14.3097C5.64755 14.3995 6.04789 14.444 6.73532 14.4671C7.81906 14.5035 8.49762 14.3977 9.41994 14.0487C9.89224 13.8699 10.7742 13.3855 10.9586 13.2035C11.0359 13.1273 11.3971 13.4793 13.7599 15.933L16.4725 18.75L17.0565 18.1435L17.6404 17.5369L14.9639 14.7517L12.2873 11.9665L12.5231 11.6553C13.0745 10.9274 13.5159 9.98045 13.7851 8.94789C13.9063 8.48289 13.923 8.2757 13.9231 7.23629C13.9231 6.22315 13.9046 5.98159 13.7941 5.55015C13.0993 2.83729 11.2272 0.867837 8.68278 0.17299C8.02226 -0.00738125 6.38232 -0.0594138 5.68375 0.0778253ZM7.69407 0.86348C8.72359 0.994495 9.75065 1.4031 10.5703 2.0077C11.0163 2.33664 11.8131 3.19524 12.1192 3.67666C13.0999 5.21909 13.401 7.17573 12.9321 8.95841C12.772 9.5673 12.2984 10.5651 11.9327 11.064C11.5631 11.5684 10.86 12.2643 10.4019 12.5791C8.33062 14.0027 5.62077 14.0027 3.54795 12.5792C3.0805 12.2582 2.33729 11.5142 1.97026 11.0001C1.10799 9.79192 0.667201 8.09315 0.828811 6.60107C1.07725 4.30821 2.3594 2.41294 4.31105 1.45389C5.43938 0.899393 6.50947 0.712673 7.69407 0.86348Z" fill="#D5DCDF"/>
                </Svg>
                </View>
            </View>
            <View style={{position:'absolute',top: 100, right: '5%'}}>
                <TouchableOpacity onPress={()=>navigation.navigate('AddBottleScreen')}>
                    <Image source={require('./Images/AddBottle.png')}/>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={70}
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
                    <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => alert(`Вы нажали ${category.name}` )}>
                        {category.icon}
                        <Text style={{fontFamily: 'Poppins_400Regular', color:'rgba(213, 220, 223, 0.6)', fontSize: 13}}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
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
        height: '7%',
        alignSelf:'center',
        borderRadius: 10,
    },
    leftBarButton:{
        alignSelf: 'center',
        marginLeft: "2%",
        marginRight: 1,
        alignItems: 'center',
    },
    categoryIcon:{
        borderRadius: 50,
        width: 25,
        height: 25,
        marginRight: 5,
        marginLeft: -10
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
        width: "80%",
        marginLeft: 7,
        padding: 5,
        borderRadius: 8,
        margin: "1%",
    },
    categoriesScrollView: {
        position:'absolute',
        bottom: 20,
        paddingHorizontal: 10,
    },
    categoryItem: {
        flexDirection:"row",
        backgroundColor:'#212121',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 20,
        marginHorizontal:10,
        height: 40,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});
