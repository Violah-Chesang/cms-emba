import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TodayDate: React.FC = () => {
  const today = new Date();
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.getDate();
  const month = today.toLocaleDateString('en-US', { month: 'long' });
  const year = today.getFullYear();

  return (
    <View>
      <Text style={styles.text}>{day} {date} {month}, {year}</Text>
    </View>
  );
}

export default TodayDate;
const styles = StyleSheet.create({
    container: {
        marginVertical:10,
    },
    text:{
        color: 'rgb(75, 85, 99)', 
        fontSize:14   
    }
  })