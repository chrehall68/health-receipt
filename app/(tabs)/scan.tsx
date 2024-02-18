import React, { useState } from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Card, Button } from 'react-native-paper';
import { Text } from '@/components/Themed';
import { medium } from '@/constants/values';
import { Title } from '@/components/StyledText';
import { api } from '@/convex/_generated/api';
import { useAction } from 'convex/react';
import * as FileSystem from 'expo-file-system'

export default function ImagePickerExample() {
    const [imageUri, setImageUri] = useState<string>("");
    const [base64, setBase64] = useState<string>("");
    const [output, setOutput] = useState<string[]>([]);

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
            const base64_ = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });

            setBase64(base64_);
            setImageUri(result.assets[0].uri);
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
            const base64_ = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });

            setBase64(base64_);
            setImageUri(result.assets[0].uri);
        }
    };
    const processReceipt = useAction(api.togetherai.processReceipt);
    const handleClick = () => {
        processReceipt({ base64Encoded: base64 }).then(resp => setOutput(resp));
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

            {imageUri !== "" && <Image source={{ uri: imageUri }} style={{ width: 400, height: 200, margin: medium }} />}
            {imageUri !== "" && <Button buttonColor='purple' onPress={handleClick} style={{ margin: medium }}>Analyze Receipt</Button>}
            {output.length !== 0 && output.map((val, idx) => <Text key={idx}>{val}</Text>)}
        </View>
    );
}
