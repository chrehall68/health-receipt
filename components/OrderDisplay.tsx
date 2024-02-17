import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { View } from "./Themed"
import { ItemCard } from "./ItemCard"
import { userId } from "@/constants/values"

interface OrderDisplayProps {
    orderId: string,
}

export const OrderDisplay: React.FC<OrderDisplayProps> = props => {
    const orders = useQuery(api.item.get, { ...props, userId: userId });
    return <View style={{ flexDirection: "column", justifyContent: 'center', alignContent: "center" }}>
        {orders?.map((val, idx) => <ItemCard {...val} key={idx} />)}
    </View>
}