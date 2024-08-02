import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useFonts, Inter_700Bold } from '@expo-google-fonts/inter';
import TodayDate from './DateToday';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TopNav: React.FC = () => {
    let [fontsLoaded] = useFonts({
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return <Text>Loading....</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View>
                    <Text style={styles.welcomeText}>Welcome Risper</Text>
                    <TodayDate />
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name="notifications" size={20} color="rgb(30 58 138)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <Ionicons name="settings-sharp" size={19} color="rgb(30 58 138)" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <FontAwesome name="navicon" size={19} color="rgb(30 58 138)" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default TopNav;

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        height:'8%'        
    },
    subContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 15,
        paddingHorizontal: 10,
        paddingVertical:5,
    },
    welcomeText: {
        color: 'rgb(30 58 138)',
        fontWeight: '600',
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginHorizontal: 6,
    },
});
