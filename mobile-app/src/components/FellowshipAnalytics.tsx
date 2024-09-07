import React, { useEffect } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { fetchMembers, fetchMembersByFellowship } from '../store/slices/memberSlice';
import AnalyticsCard from './AnalyticsCard';
import { useAppDispatch, useAppSelector } from '../store/store';

const fellowshipTypes = [
  'Men',
  'Youth',
  'JSS',
  'Women',  
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
    dispatch(fetchMembers())
      .unwrap()
      .then((payload) => {
        console.log('fetchMembers success:');
      })
      .catch((error) => {
        console.error('fetchMembers error:', error);
      });

    fellowshipTypes.forEach(type => {
      dispatch(fetchMembersByFellowship(type))
        .unwrap()
        .then((payload) => {
          console.log(`fetchMembersByFellowship (${type}) success:`);
        })
        .catch((error) => {
          console.error(`fetchMembersByFellowship (${type}) error:`);
        });
    });
  }, [dispatch]);


  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  if (!Array.isArray(data) || data.length === 0) {
    return <Text>No data available.</Text>;
  }

  const calculatePercentage = (count: number, total: number) => total > 0 ? `${Math.round((count / total) * 100)}%` : '0%';

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
    title: 'Total',
    count: totalCount,
    percentage: calculatePercentage(totalCount, totalCount)
  });

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Member Statistics</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom:60,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    marginLeft: 5,
    fontSize: 18,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    padding: 5,
  },
});

export default FellowshipAnalytics;
