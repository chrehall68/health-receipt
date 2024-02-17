import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card } from 'react-native-paper';
import { medium, userId } from '@/constants/values';
import { Link } from 'expo-router';

interface HistoryItemProps {
  orderId: string
}
const HistoryItem: React.FC<HistoryItemProps> = props => {
  return <Card style={{ margin: medium }}>
    <Card.Content>
      <Link href={{ pathname: `/order/${props.orderId}`, }}>
        <Text>Order #{props.orderId}</Text>
      </Link>
    </Card.Content>
  </Card>
}

export default function HistoryScreen() {
  const history = useQuery(api.item.getUserHistory, { userId: userId })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {history?.map((val, idx) => <HistoryItem key={idx} {...val} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
