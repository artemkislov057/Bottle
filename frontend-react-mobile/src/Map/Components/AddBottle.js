import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Picker,
    Keyboard, TouchableWithoutFeedback
} from "react-native";
import {Path, Svg} from "react-native-svg";
import {useState} from "react";
import ModalDropdown from 'react-native-modal-dropdown';
import {DrawerItem} from "@react-navigation/drawer";

export default function AddBottle({navigation}) {
    const [nameText, setNameText] = useState()
    const [selectedValue, setSelectedValue] = useState("Категории");
    const [descriptionText, setDescriptionText] = useState()
    const [pickCount, setPickCount] = useState()

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity style={styles.goBack} onPress={()=> navigation.openDrawer()}>
                        <Svg width="30" height="20" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M6.02394 1.0913C5.94339 1.15734 4.78002 2.53095 3.43873 4.1437L1 7.07605L3.50009 10.08C4.87519 11.7321 6.06072 13.1061 6.13462 13.1334C6.27286 13.1841 6.54665 13.0575 6.63682 12.901C6.6648 12.8525 6.68745 12.7044 6.68718 12.572C6.68676 12.3663 6.40612 11.9928 4.75821 10.0042L2.82972 7.67716H10.6443C18.5027 7.78676 18.7183 7.5781 18.8599 7.42957C19.0467 7.23369 19.0467 6.91105 18.8599 6.71517C18.7183 6.56664 18.5027 6.35797 10.6443 6.4735H2.82972L4.75821 4.14643C6.4181 2.14354 6.68697 1.78517 6.68828 1.57388C6.69112 1.11778 6.32017 0.848398 6.02394 1.0913Z" stroke="#766AC8"/>
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.title}>Создание записки</Text>
                </View>
                <View style={styles.nameInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Название записки"
                        placeholderTextColor={'rgba(213, 220, 223, 0.7)'}
                        value={nameText}
                        onChangeText={setNameText}
                    />
                </View>
                <View style={{marginTop: 150}}>
                    <ModalDropdown
                        options={['Тусовки', 'Знакомства', 'Спорт', 'Продажи', 'Прочее']}
                        defaultValue={'Категории'}
                        style={styles.picker}
                        textStyle={styles.pickerText}
                        dropdownStyle={styles.dropdownList}
                        dropdownTextStyle={styles.dropdownText}
                        dropdownTextHighlightStyle={{color: 'rgba(213, 220, 223, 0.7)', backgroundColor: '#212121', }}
                        renderSeparator={()=><View/>}
                        onSelect={setSelectedValue}
                    />
                </View>
                <View style={styles.descriptionField}>
                    <TextInput
                        style={styles.description}
                        multiline
                        placeholder='Описание'
                        placeholderTextColor={'rgba(213, 220, 223, 0.7)'}
                        onChangeText={setDescriptionText}
                    />
                </View>
                <View style={styles.timeAndPickContainer}>
                    <View style={styles.timeContainer}>
                        <Text style={{fontSize: 15, alignSelf: 'center', fontFamily: 'Poppins_400Regular', color:'#CDCDCD'}}>Длительность записки:</Text>
                        <View style={{flex:1, flexDirection: 'row', justifyContent:'center', marginRight: 0}}>
                            <View style={{width: '30%', height: '50%', borderRadius: 10, backgroundColor: '#373839', marginTop: 10}}>
                                <TextInput
                                    keyboardType= 'number-pad'
                                    style={{height: '90%',
                                        paddingLeft: 5,
                                        marginRight: 5,
                                        alignSelf:'center',
                                        fontFamily: 'Poppins_400Regular',
                                        color: 'rgba(213, 220, 223, 0.7)',
                                        fontSize:16}}/>
                            </View>
                            <View style={{marginLeft: 10, marginTop: 25, marginRight: 10}}>
                                <Svg width="5" height="15" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <Path d="M2.02326 12C1.43411 12 0.945736 11.8408 0.55814 11.5225C0.186047 11.1903 0 10.782 0 10.2976C0 9.81315 0.186047 9.41177 0.55814 9.09343C0.945736 8.76125 1.43411 8.59516 2.02326 8.59516C2.5969 8.59516 3.06977 8.76125 3.44186 9.09343C3.81395 9.41177 4 9.81315 4 10.2976C4 10.782 3.81395 11.1903 3.44186 11.5225C3.06977 11.8408 2.5969 12 2.02326 12ZM2.02326 3.40484C1.43411 3.40484 0.945736 3.24568 0.55814 2.92734C0.186047 2.59516 0 2.18685 0 1.70242C0 1.21799 0.186047 0.81661 0.55814 0.49827C0.945736 0.166091 1.43411 0 2.02326 0C2.5969 0 3.06977 0.166091 3.44186 0.49827C3.81395 0.81661 4 1.21799 4 1.70242C4 2.18685 3.81395 2.59516 3.44186 2.92734C3.06977 3.24568 2.5969 3.40484 2.02326 3.40484Z" fill="#D5DCDF" fill-opacity="0.8"/>
                                </Svg>
                            </View>
                            <View style={{width: '30%', height: '50%', borderRadius: 10, backgroundColor: '#373839', marginTop: 10}}>
                                <TextInput
                                    keyboardType= 'number-pad'
                                    style={{height: '90%',
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        alignSelf:'center',
                                        fontFamily: 'Poppins_400Regular',
                                        color: 'rgba(213, 220, 223, 0.7)',
                                        fontSize:16}}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.pickContainer}>
                        <Text style={{fontSize: 15, alignSelf: 'center', fontFamily: 'Poppins_400Regular', color:'#CDCDCD'}}>Количество поднятий</Text>
                        <View style={{width: '50%', height: '45%', borderRadius: 10, backgroundColor: '#373839', marginTop: 7, alignSelf: 'center'}}>
                            <TextInput
                                keyboardType= 'number-pad'
                                style={{height: '100%',
                                    width: '70%',
                                    alignSelf:'center',
                                    paddingLeft: 25,
                                    paddingRight: 5,
                                    fontFamily: 'Poppins_400Regular',
                                    color: 'rgba(213, 220, 223, 0.7)',
                                    fontSize:16}}
                                onChangeText={setPickCount}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ height:'27%', flexDirection:'column'}}>
                    <Text style={{paddingLeft: 17, fontSize: 18, fontFamily: 'Poppins_400Regular', color: 'rgba(213,' +
                            ' 220, 223, 0.6)'}}>Фотографии</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>alert(`Текст названия: ${nameText}`)} style={{marginLeft: 15, marginTop: 15}}>
                            <Image source={require('../Images/AddPhoto.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>alert(`Текст описания: ${descriptionText}`)} style={{marginLeft: 15, marginTop: 15}}>
                            <Image source={require('../Images/AddPhoto.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
        flexDirection: 'column'
    },
    titleContainer:{
        position:'absolute',
        flexDirection: "column",
        height: '10%',
        width: '100%',
        alignItems: 'center',
    },
    goBack:{
        flex: 1,
        alignSelf: 'flex-start',
        left: 15,
        top: 37,
    },
    title:{
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        color: '#CDCDCD'
    },
    nameInput:{
        position:'absolute',
        flexDirection: "row",
        backgroundColor: '#373839',
        width: '90%',
        height: '7%',
        alignSelf:'center',
        borderRadius: 10,
        marginTop: 80,
    },
    input: {
        height: '100%',
        width: '100%',
        marginLeft: 15,
        marginRight: 15,
        fontFamily: 'Poppins_400Regular',
        color: 'rgba(213, 220, 223, 0.7)',
        fontSize: 15
    },
    picker:{
        backgroundColor: 'rgba(55, 56, 57, 1)',
        height: 50,
        color: 'rgba(213, 220, 223, 0.7)',
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10
    },
    pickerText:{
        color: 'rgba(213, 220, 223, 0.7)',
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        width: '100%',
        height: 50,
        paddingTop: 15,
        paddingLeft: 15
    },
    dropdownList:{
        width: '90%',
        backgroundColor: 'rgba(55, 56, 57, 1)',
        marginTop: -10,
        height: 190,
        borderColor: 'rgba(55, 56, 57, 1)',
        borderTopWidth: 1,
        borderTopColor: '#171717'
    },
    dropdownText:{
        backgroundColor: 'rgba(55, 56, 57, 1)',
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        color: 'rgba(213, 220, 223, 0.7)',
        paddingLeft: 15
    },
    descriptionField:{
        flexDirection: "row",
        backgroundColor: '#373839',
        width: '90%',
        height: '22%',
        alignSelf:'center',
        borderRadius: 10,
        marginTop: 15,
    },
    description:{
        height: '90%',
        width: '100%',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 7,
        fontFamily: 'Poppins_400Regular',
        color: 'rgba(213, 220, 223, 0.7)',
        fontSize: 15
    },
    timeAndPickContainer: {
        flex:1,
        flexDirection: 'row',
        marginTop: 15,
        width: '100%',
        height: 150,
    },
    timeContainer:{
        width: '50%',
        height: '100%',
        paddingLeft: 15,
    },
    pickContainer:{
        height: '100%',
        width: '50%'
    },
})