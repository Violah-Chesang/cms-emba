import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black } from '@expo-google-fonts/inter';


const Hero: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
});

if (!fontsLoaded) {
    return <Text>Loading....</Text>;
}
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <Text style={styles.title}>MCK Embakasi</Text>
        <Text style={styles.subTitle}>Where everyone is somebody and Jesus is Lord</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btnText}>Learn More</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rightView}>
        <Image
          source={require('../../assets/hero_image-removebg.png')}
          style={styles.image}
        />
      </View>
    </View>
  )
}

export default Hero

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(23 37 84)',
    borderRadius: 8,
    margin: 5,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:10,
    height:'28%'
  },
  leftView:{
    width:'49%',
    gap:8
  },
  title:{
    color:'white',
    fontFamily:'Inter_700Bold',
    fontSize:22
  },
  subTitle:{
    color:'white',
    fontFamily:'Inter_300Light',
    fontSize:14
  },
  button:{
    backgroundColor:'#efbf04',
    width:'50%',
    alignItems:'center',
    padding:5,
    borderRadius:3,
  },
  btnText:{
    color:'rgb(23 37 84)',
    fontFamily:'Inter_300Light',
    fontSize:12
  },
  rightView:{
    width:'50%'
  },
  image: {
    width:170,
    height:70
  }
})