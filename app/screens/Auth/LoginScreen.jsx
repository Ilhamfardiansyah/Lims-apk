import { AuthContext } from '@/context/AuthProvider';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useContext(AuthContext);

    return (
    <View style={styles.container}>

        <View style= {{ marginTop: 130, width: 260 }}>
        <View style={{ alignItems: 'center' }}>
            <Image style={styles.logo} source={require('../../../assets/images/puslabfor-480.png')}></Image>
        </View>
        <View style={{ marginTop: 40 }}>
        {error &&<Text style={{ color: 'red' }}>{error}</Text>}
            <TextInput
                style={[styles.inputBox, styles.ml4]}
                onChangeText={setEmail}
                value={email}
                placeholder='Email'
                placeholderTextColor="gray"
                textContentType='emailAddres'
                keyboardType='email-address'
                autoCapitalize='none'
            />
        </View>
            <TextInput
                style={[styles.inputBox, styles.ml4]}
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                placeholderTextColor="gray"
                autoCapitalize='none'
                secureTextEntry={true}
            />
        </View>

            <TouchableOpacity
                onPress={() => login(email, password)}
                style={[ styles.loginButton, styles.mt5 ]}    
            >
                {isLoading && (
                    <ActivityIndicator 
                        style={{ marginRight: 18 }} 
                        size="small" color="white" 
                        />
                )}
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <Text style={{ fontSize: 12 }}>Create you'r account here!! </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register Screen')}
                    style={[ styles.registerTextLink ]}    
                >
                    <Text style={styles.loginButtonText}>Register</Text>
                </TouchableOpacity>
        </View>
        {/* <Button onPress={() => navigation.navigate('Register Screen')} title='go to register'/> */}

        
    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: '#1d9bf1',
        alignItems: "center",
        flex: 1,
    },
    logo : {
        width: 250,
        height: 250
    },
    inputBox : {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 8,
        padding: 10,
    },
    ml4 : {
        marginTop: 16
    },
    mt5 : {
        marginTop: 22
    },
    loginButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0084B3',
        padding: 12,
        borderRadius: 5,
        width: '70%'
    },
    loginButtonText: {
        color: 'white'
    },
    registerTextLink : {
        fontSize: 12,
        color: 'white',
        textDecorationLine: 'underline'
    }
})