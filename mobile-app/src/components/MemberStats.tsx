import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts,  Inter_700Bold,} from '@expo-google-fonts/inter';
import FellowshipAnalytics from './FellowshipAnalytics';


const MemberStats: React.FC = () => {
  let [fontsLoaded] = useFonts({
   
    Inter_700Bold,
    
  });

  if (!fontsLoaded) {
    return <Text>Loading....</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member Statistics</Text>
      <FellowshipAnalytics/>
    </View>
  )
}

export default MemberStats

const styles = StyleSheet.create({
  container: {
    margin: 7,
  },
  subContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: "center",
  },
  title: {
    fontFamily: 'Inter_700Bold',
    marginLeft: 5,
    fontSize: 18,
  },
})