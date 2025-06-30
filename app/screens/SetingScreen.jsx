import { AuthContext } from '@/context/AuthProvider';
import { useContext } from 'react';
import { Button, Text, View } from 'react-native';

export default function SetingScreen() {
    const { logout } = useContext(AuthContext);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SetingScreen</Text>
            <Button title='Logout' onPress={logout}/>
        </View>
    )
}