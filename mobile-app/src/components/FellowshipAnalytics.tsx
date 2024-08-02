import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { fetchMembers, fetchMembersByFellowship } from '../store/slices/memberSlice';
import AnalyticsCard from './AnalyticsCard';
import { useAppDispatch, useAppSelector } from '../store/store';

const fellowshipTypes = [
  'Men Fellowship',
  'Women Fellowship',
  'Youth Fellowship',
  'Jss Fellowship'
];

interface CardData {
  title: string;
  count: number;
  percentage: string;
}

const FellowshipAnalytics: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, loading, error } = useAppSelector((state) => state.members);
  
    useEffect(() => {
      // Fetch all members
      dispatch(fetchMembers());
      fellowshipTypes.forEach(type => dispatch(fetchMembersByFellowship(type)));
    }, [dispatch]);
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;
  
    const calculatePercentage = (count: number, total: number) => `${Math.round((count / total) * 100)}%`;
  
    const getFellowshipData = (type: string): CardData => {
      const count = data.filter(member => member.fellowship === type).length;
      return {
        title: type,
        count,
        percentage: calculatePercentage(count, data.length)
      };
    };
  
    // Generate cards data
    const cardsData: CardData[] = fellowshipTypes.map(type => getFellowshipData(type));
    const totalCount = data.length;
    cardsData.push({
      title: 'Total Members',
      count: totalCount,
      percentage: calculatePercentage(totalCount, totalCount)
    });
  
    return (
      <ScrollView style={styles.container}>
        <View style={styles.cardsContainer}>
          {cardsData.map(({ title, count, percentage }) => (
            <AnalyticsCard
              key={title}
              title={title}
              count={count}
              percentage={percentage}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default FellowshipAnalytics;
