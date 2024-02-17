import { itemSchema } from "@/convex/item"
import { View } from "react-native";
import { Text } from "./Themed"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { medium, small } from "@/constants/values";

const getColor = (val: number) => {
    if (val > 66) {
        return "green";
    }
    if (val > 33) {
        return "orange";
    }
    return "red"
}

export const ItemCard: React.FC<itemSchema> = props => {
    const fill = props.healthScore === undefined ? -1 : props.healthScore;
    return <Card style={{ margin: medium }}>
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "column", paddingRight: 100 }}>
                <Text>{props.name}</Text>
                <Text style={{ fontStyle: "italic" }}>Calories: {props.calories}</Text>
            </View>
            <AnimatedCircularProgress
                size={50}
                width={3}
                fill={fill}
                tintColor={getColor(fill)}
                backgroundColor="#3d5875">
                {
                    (fill) => (
                        <Text style={{ color: "white" }}>
                            {fill}
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
        </Card.Content>
    </Card>
}

const style = StyleSheet.create(
    {}
)