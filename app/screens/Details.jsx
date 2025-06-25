import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';


export default function Details() {
    const { itemId, otherParam } = useLocalSearchParams();

    return (
        <View>
            <Text>Ini ada detail {itemId} {otherParam}</Text>
        </View>
    )
}