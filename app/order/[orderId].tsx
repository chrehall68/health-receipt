import { OrderDisplay } from "@/components/OrderDisplay";
import { Text, View } from "@/components/Themed";
import { medium, small, xl } from "@/constants/values";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { Divider } from "react-native-paper";


export default function Page() {
    const params = useLocalSearchParams();
    const { orderId } = params;
    return <View style={{ padding: medium, height: "100%" }}>
        <Stack.Screen options={{ title: "Order" }} />
        <ScrollView>
            <Text style={{ fontSize: xl }}>Order #{orderId}</Text>
            <Text>Here's the stats for your order!</Text>
            <Divider style={{ margin: small }} />
            <OrderDisplay orderId={orderId.toString()} />
        </ScrollView>
    </View>
}