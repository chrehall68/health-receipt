import React, { useState } from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Button } from 'react-native-paper';
import { Text } from '@/components/Themed';
import { medium } from '@/constants/values';
import { Title } from '@/components/StyledText';

export default function ImagePickerExample() {
    const [image, setImage] = useState<string>("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takeImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', height: "100%" }}>

            <Title style={{ height: "30%" }}>Scan</Title>

            <Card onPress={pickImage} style={{ width: "90%", margin: medium }} >
                <Card.Content >
                    <Text style={{ textAlign: "center" }}>Use existing image</Text>
                </Card.Content>
            </Card>
            <Card onPress={takeImage} style={{ width: "90%", margin: medium }}>
                <Card.Content>
                    <Text style={{ textAlign: "center" }}>Take new image</Text>
                </Card.Content>
            </Card>

            {image !== "" && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: medium }} />}
            {image !== "" && <Button buttonColor='blue' style={{ margin: medium }}>Analyze Receipt</Button>}
        </View>
    );
}
