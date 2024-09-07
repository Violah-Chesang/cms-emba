import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopNav from '../components/TopNav'
import Hero from '../components/Hero'
import Leaders from '../components/Leaders'
import FellowshipAnalytics from '../components/FellowshipAnalytics'

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TopNav />
          <Hero />
          <FellowshipAnalytics/>
          <Leaders />
      </SafeAreaView>
    </View>

  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  subContainer:{
    
  },
  memberStats: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5
  },
})