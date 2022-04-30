import * as React from 'react';
import {Text, View} from "react-native";

export default function Dialogues({navigation}) {
    return(
        <View style={{backgroundColor: '#FA8072', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Poppins_600SemiBold', fontSize: 30, color: '#C5CDCF'}}>Здесь будут диалоги</Text>
                <Text style={{paddingTop: 50}}>Артём сделает, потому что он очень умный</Text>
        </View>
    )
}