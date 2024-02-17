import { OrderDisplay } from "@/components/OrderDisplay";
import { Text } from "@/components/Themed";
import { medium, xl } from "@/constants/values";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";


export default function Page() {
    const params = useLocalSearchParams();
    const { orderId } = params;
    return <View style={{ padding: medium }}>
        <Stack.Screen options={{ title: "Order" }} />

        <Text style={{ fontSize: xl }}>Order #{orderId}</Text>
        <Text>Here's the stats for your order!</Text>
        <Divider />
        <OrderDisplay orderId={orderId.toString()} />
    </View>
}