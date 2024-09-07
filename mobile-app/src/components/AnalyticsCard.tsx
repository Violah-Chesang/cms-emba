import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

interface AnalyticsCardProps {
  title: string;
  count: number;
  percentage: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, count, percentage }) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.groupStats}>
        <View style={styles.count}>
          <Image
            source={require('../../assets/line-chart-removebg-preview.png')}
            style={styles.image}
          />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.imageView}>
          <Text style={styles.number}>{count}</Text>
        </View>
      </View>
      <View style={styles.percentage}>
        <Text style={styles.percentageText}>Percentage</Text>
        <Text style={styles.percentageNumber}>{percentage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(219 234 254)',
    borderRadius: 6,
    padding: 4,
    paddingHorizontal: 7,
    minWidth: '31.5%',
    margin: 2,
  },
  groupStats: {},
  count: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  titleText: {
    fontFamily: 'Inter_700Bold',
    fontSize:15,
  },
  number: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    margin: 4,
  },
  imageView: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 25,
  },
  percentage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  percentageText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  percentageNumber: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
});

export default AnalyticsCard;
