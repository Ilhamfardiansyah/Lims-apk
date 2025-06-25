import { Text, View } from 'react-native';

function ProfileScreen() {
    const navigation = useNavigation();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        console.log('ProfileScreen focused');
        });

        return unsubscribe;
    }, [navigation]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
        console.log('ProfileScreen blurred');
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        </View>
    );
}