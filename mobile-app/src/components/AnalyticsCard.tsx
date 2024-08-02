import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, Inter_900Black } from '@expo-google-fonts/inter';

interface AnalyticsCardProps {
  title: string;
  count: number;
  percentage: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, count, percentage }) => {
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
    minWidth: '47.5%',
    margin: 4
  },
  groupStats: {},
  count: {
    flexDirection: 'row',
    gap: 4,
  },
  titleText: {
    fontFamily: 'Inter_700Bold'
  },
  number: {
    fontFamily: 'Inter_700Bold',
    fontSize: 30,
    margin: 4
  },
  imageView: {
    alignItems: "center"
  },
  image: {
    width: 25,
    height: 20
  },
  percentage: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  percentageText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium'
  },
  percentageNumber: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
});

export default AnalyticsCard;
