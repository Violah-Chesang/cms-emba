import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';


const Leaders: React.FC = () => {
    let [fontsLoaded] = useFonts({
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <Text>Loading....</Text>;
    }
    return (
        <View>
            <Text style={styles.title}>Leaders</Text>
        </View>
    )
}

export default Leaders

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Inter_700Bold',
        marginLeft: 5,
        fontSize: 17,
      },
})