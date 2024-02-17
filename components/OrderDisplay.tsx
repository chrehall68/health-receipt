import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Text, View } from "./Themed"
import { ItemCard } from "./ItemCard"
import { Dimensions } from "react-native"

interface OrderDisplayProps {
    orderId: string
}

export const OrderDisplay: React.FC<OrderDisplayProps> = props => {
    const orders = useQuery(api.item.get, props);
    return <View style={{ flexDirection: "column", justifyContent: 'center', alignContent: "center" }}>
        {orders?.map((val, idx) => <ItemCard {...val} key={idx} />)}
    </View>
}