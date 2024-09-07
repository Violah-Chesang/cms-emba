import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';


const Leaders: React.FC = () => {
    let [fontsLoaded] = useFonts({
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <Text>Loading....</Text>;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaders</Text>
            <View>
                <TouchableOpacity style={styles.headerContainer}>
                    <Text style={styles.headerText}>NAME</Text>
                    <Text style={styles.headerText}>FELLOWSHIP</Text>
                    <Text style={styles.headerText}>PHONE NO.</Text>
                    <Text style={styles.headerText}>ACTIONS</Text>
                    {/* <Entypo name="dots-three-vertical" size={18} color="black" /> */}
                    
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Leaders

const styles = StyleSheet.create({
    container:{
        margin:5
    },
    title: {
        fontFamily: 'Inter_700Bold',
        marginLeft: 5,
        fontSize: 18,
    },
    headerContainer:{
        borderRadius:1,
        borderColor:"black",
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    headerText:{
        padding:4,
        // borderRadius:1,
        // borderColor:"black",
        // borderWidth:1
    },
})