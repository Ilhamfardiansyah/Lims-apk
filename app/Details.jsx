import { useFocusEffect } from 'expo-router';
import { Text, View } from 'react-native';


export default function Details({route}) {
    useFocusEffect(() => {
        console.log('ProfileScreen useEffect');
        return () => {
            console.log('ProfileScreen cleanup');
        };
    });

    const { itemId, otherParam } = route.params;
    return (
        <View>
            <Text>Ini ada detail {itemId} {otherParam}</Text>
        </View>
    )
}