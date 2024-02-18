import { itemSchema } from "@/convex/item"
import { View } from "react-native";
import { Text } from "./Themed"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { StyleSheet } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { medium, small } from "@/constants/values";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PaginationResult } from "convex/server";

const getColor = (val: number) => {
    if (val > 66) {
        return "green";
    }
    if (val > 33) {
        return "orange";
    }
    return "red"
}

interface itemcardProps {
    'Column': string, 'code': string, 'product_name': string, 'generic_name': string, 'quantity': string, 'packaging_en': string, 'packaging_text': string, 'brands': string, 'brands_tags': string, 'categories': string, 'categories_tags': string, 'labels': string, 'labels_tags': string, 'first_packaging_code_geo': string, 'stores': string, 'ingredients_text': string, 'ingredients_analysis_tags': string, 'allergens': string, 'allergens_en': string, 'traces': string, 'traces_tags': string, 'traces_en': string, 'serving_size': string, 'serving_quantity': string, 'additives_n': string, 'additives': string, 'additives_tags': string, 'nutriscore_score': string, 'nutriscore_grade': string, 'nova_group': string, 'ecoscore_score': string, 'ecoscore_grade': string, 'nutrient_levels_tags': string, 'product_quantity': string, 'image_url': string, 'image_small_url': string, 'energy_kj_100g': string, 'energy_kcal_100g': string, 'energy_100g': string, 'energy_from_fat_100g': string, 'fat_100g': string, 'saturated_fat_100g': string, 'butyric_acid_100g': string, 'caproic_acid_100g': string, 'caprylic_acid_100g': string, 'capric_acid_100g': string, 'lauric_acid_100g': string, 'myristic_acid_100g': string, 'palmitic_acid_100g': string, 'stearic_acid_100g': string, 'arachidic_acid_100g': string, 'behenic_acid_100g': string, 'lignoceric_acid_100g': string, 'cerotic_acid_100g': string, 'montanic_acid_100g': string, 'melissic_acid_100g': string, 'unsaturated_fat_100g': string, 'monounsaturated_fat_100g': string, 'omega_9_fat_100g': string, 'polyunsaturated_fat_100g': string, 'omega_3_fat_100g': string, 'omega_6_fat_100g': string, 'alpha_linolenic_acid_100g': string, 'eicosapentaenoic_acid_100g': string, 'docosahexaenoic_acid_100g': string, 'linoleic_acid_100g': string, 'arachidonic_acid_100g': string, 'gamma_linolenic_acid_100g': string, 'dihomo_gamma_linolenic_acid_100g': string, 'oleic_acid_100g': string, 'elaidic_acid_100g': string, 'gondoic_acid_100g': string, 'mead_acid_100g': string, 'erucic_acid_100g': string, 'nervonic_acid_100g': string, 'trans_fat_100g': string, 'cholesterol_100g': string, 'carbohydrates_100g': string, 'sugars_100g': string, 'added_sugars_100g': string, 'sucrose_100g': string, 'glucose_100g': string, 'fructose_100g': string, 'lactose_100g': string, 'maltose_100g': string, 'maltodextrins_100g': string, 'starch_100g': string, 'polyols_100g': string, 'erythritol_100g': string, 'fiber_100g': string, 'soluble_fiber_100g': string, 'insoluble_fiber_100g': string, 'proteins_100g': string, 'casein_100g': string, 'serum_proteins_100g': string, 'nucleotides_100g': string, 'salt_100g': string, 'added_salt_100g': string, 'sodium_100g': string, 'alcohol_100g': string, 'vitamin_a_100g': string, 'beta_carotene_100g': string, 'vitamin_d_100g': string, 'vitamin_e_100g': string, 'vitamin_k_100g': string, 'vitamin_c_100g': string, 'vitamin_b1_100g': string, 'vitamin_b2_100g': string, 'vitamin_pp_100g': string, 'vitamin_b6_100g': string, 'vitamin_b9_100g': string, 'folates_100g': string, 'vitamin_b12_100g': string, 'biotin_100g': string, 'pantothenic_acid_100g': string, 'silica_100g': string, 'bicarbonate_100g': string, 'potassium_100g': string, 'chloride_100g': string, 'calcium_100g': string, 'phosphorus_100g': string, 'iron_100g': string, 'magnesium_100g': string, 'zinc_100g': string, 'copper_100g': string, 'manganese_100g': string, 'fluoride_100g': string, 'selenium_100g': string, 'chromium_100g': string, 'molybdenum_100g': string, 'iodine_100g': string, 'caffeine_100g': string, 'taurine_100g': string, 'ph_100g': string, 'fruits_vegetables_nuts_100g': string, 'fruits_vegetables_nuts_dried_100g': string, 'fruits_vegetables_nuts_estimate_100g': string, 'fruits_vegetables_nuts_estimate_from_ingredients_100g': string, 'collagen_meat_protein_ratio_100g': string, 'cocoa_100g': string, 'chlorophyl_100g': string, 'carbon_footprint_100g': string, 'carbon_footprint_from_meat_or_fish_100g': string, 'nutrition_score_fr_100g': string, 'nutrition_score_uk_100g': string, 'glycemic_index_100g': string, 'water_hardness_100g': string, 'choline_100g': string, 'phylloquinone_100g': string, 'beta_glucan_100g': string, 'inositol_100g': string, 'carnitine_100g': string, 'sulphate_100g': string, 'nitrate_100g': string, 'acidity_100g': string,
}

export const ItemCard: React.FC<{ product_name: string }> = props => {
    const facts = useQuery(api.openfoodfacts.getFoodFacts, { product_name: props.product_name });
    const fill = 88;

    if (facts !== undefined) {
        if (facts.length !== 0) {
            return <Card style={{ margin: medium }}>
                <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text>{props.product_name}</Text>
                        <Text style={{ fontStyle: "italic" }}>Calories: {Math.round(facts[0]?.energy_kcal_100g)} / 100g</Text>
                    </View>
                    <AnimatedCircularProgress
                        size={50}
                        width={3}
                        fill={fill}
                        tintColor={getColor(fill)}
                        backgroundColor="white">
                        {
                            (_) => (
                                <Text style={{ color: "purple" }}>
                                    {fill}
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>
                </Card.Content>
            </Card>
        }

        // not found
        return <Card style={{ margin: medium }}>
            <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "column" }}>
                    <Text>Item Not Found </Text>
                </View>
            </Card.Content>
        </Card>
    }

    // loading
    return <Card style={{ margin: medium }}>
        <Card.Content style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <ActivityIndicator size="large" />
        </Card.Content>
    </Card>
}

const style = StyleSheet.create(
    {}
)