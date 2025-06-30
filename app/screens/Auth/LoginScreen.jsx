import { AuthContext } from '@/context/AuthProvider';
import React, { useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        <TextInput 
            onChangeText={setEmail}
            value={email}
            placeholder='Email'
            placeholderTextColor="gray"
            textContentType='emailAddres'
            keyboardType='email-addres'
            autoCapitalize='none'
        />
        <TextInput 
            onChangeText={setPassword}
            value={password}
            placeholder='Password'
            placeholderTextColor="gray"
            autoCapitalize='none'
            secureTextEntry={true}
        />
        <Button onPress={() => login(email, password)} title='Login'/>
        <Button onPress={() => navigation.navigate('Register Screen')} title='go to register'/>
    </View>
    )
}