import { OrderDisplay } from "@/components/OrderDisplay";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { medium, small, xl } from "@/constants/values";
import { api } from "@/convex/_generated/api";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, ScrollView, useColorScheme } from "react-native";
import { Divider } from "react-native-paper";


export default function Page() {
    const colorscheme = useColorScheme();
    const params = useLocalSearchParams();
    const { orderId } = params;
    const date = useQuery(api.item.getPurchaseDate, { orderId: orderId.toString() });

    return <View style={{ padding: medium, height: "100%" }}>
        <Stack.Screen options={{
            title: "Order", headerRight: () => (
                <Link href="/order/about" asChild>
                    <Pressable>
                        {({ pressed }) => (
                            <FontAwesome
                                name="info"
                                size={25}
                                color={Colors[colorscheme ?? 'light'].text}
                                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                        )}
                    </Pressable>
                </Link>)
        }} />
        <ScrollView>
            {date !== undefined ?
                <View>
                    <Text style={{ fontSize: xl }}>Order from {date !== undefined && new Date(date[0]._creationTime).toLocaleDateString()}</Text>
                    <Text>Here's the stats for your order!</Text>
                </View>
                :
                <Text style={{ fontSize: xl }}>Order details loading...</Text>
            }

            <Divider style={{ margin: small }} />
            <OrderDisplay orderId={orderId.toString()} />
        </ScrollView>
    </View>
}