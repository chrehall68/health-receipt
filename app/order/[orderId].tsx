import { OrderDisplay } from "@/components/OrderDisplay";
import { Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";


export default function Page() {
    const params = useLocalSearchParams();
    const { orderId } = params;
    return <View>
        <Text>Here's the stats for order #{orderId}</Text>
        <Divider />
        <OrderDisplay orderId={orderId.toString()} />
    </View>
}