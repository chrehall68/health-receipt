import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { large, lxl, medium, small, xl } from '@/constants/values';
import { Divider } from 'react-native-paper';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useAppSelector } from '../hooks';

export default function Home() {
  const userId = useAppSelector(state => state.creds.userId)
  const pastOrders = useQuery(api.item.getUserHistory, { userId: userId })
  const hasHistory = pastOrders !== undefined && pastOrders.length !== 0
  return (
    <View style={{ flex: 0, alignItems: 'center', justifyContent: 'center', padding: xl }}>
      <Text style={{ fontSize: lxl }}>Welcome back, {userId}!</Text>
      <Text>Glad to have you with us.</Text>
      <Divider style={{ height: large }} />
      {hasHistory ?
        <Text style={{ lineHeight: lxl }}>Great job! You've already taken {pastOrders.length} steps towards living a healthier life! Check out
          the History section to view your previous orders, or check out the below recommendations for how you
          can improve your shopping habits!
        </Text>
        :
        <Text style={{ lineHeight: lxl }}>You haven't scanned any receipts yet. Scan a Trader Joe's receipt to get started!</Text>
      }
    </View>
  );
};