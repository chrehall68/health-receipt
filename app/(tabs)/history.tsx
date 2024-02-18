import { Text, View } from '@/components/Themed';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Card } from 'react-native-paper';
import { medium } from '@/constants/values';
import { router } from 'expo-router';
import { Title } from '@/components/StyledText';
import { useAppSelector } from '../hooks';

interface HistoryItemProps {
  orderId: string
}
const HistoryItem: React.FC<HistoryItemProps> = props => {
  return <Card style={{ margin: medium }} onPress={() => router.push(`/order/${props.orderId}`)}>
    <Card.Content>
      <Text>Order #{props.orderId}</Text>
    </Card.Content>
  </Card>
}

export default function HistoryScreen() {
  const userId = useAppSelector(state => state.creds.userId)
  const history = useQuery(api.item.getUserHistory, { userId: userId })
  return (
    <View style={{ padding: medium, height: "100%" }}>
      <Title style={{ height: "30%" }}>History</Title>
      {history?.map((val, idx) => <HistoryItem key={idx} {...val} />)}
    </View>
  );
}