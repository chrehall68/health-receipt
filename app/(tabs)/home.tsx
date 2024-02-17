import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { OrderDisplay } from '@/components/OrderDisplay';
import { large, lxl, medium, small, userId, xl } from '@/constants/values';
import { Divider } from 'react-native-paper';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function Home() {
  const pastOrders = useQuery(api.item.getUserHistory, { userId: userId })
  const hasHistory = pastOrders !== undefined && pastOrders.length !== 0
  return (
    <View style={{ ...styles.container, padding: xl }}>
      <Text style={styles.title}>Welcome back, {userId}!</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
