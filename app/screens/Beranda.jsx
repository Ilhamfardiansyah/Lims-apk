import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function Beranda({navigation}) {
    const [tweet, setTweet] = useState('')
    function sendTweet() {
        navigation.navigate('Tabs')
    }

    return (
        <View style={styles.container}>
            <View style={styles.tweetButtonContainer}>
                <Text style={tweet.length > 250 ? styles.textRed : styles.textGray}>Characters left: {280 - tweet.length}</Text>
                
                <TouchableOpacity style={styles.tweetButton} onPress={() => sendTweet()}>
                    <Text style={styles.tweetButtonText}>Tweet</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tweetBoxContainer}>
                <Image style={styles.avatar} source={{ 
                    uri: 'https://i.pravatar.cc/150?img=3'
                }}/>
                <TextInput
                    style={styles.input}
                    onChangeText={setTweet}
                    onChange={setTweet}
                    value={tweet}
                    placeholder="What's happening?"
                    placeholderTextColor="gray"
                    multiline
                    maxLength={280}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textGray: {
        color: 'gray',
    },
    textRed: {
        color: 'red',
    },  
    ml4: {
        marginLeft: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    tweetButtonContainer: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },  
    tweetButton: {
        backgroundColor: '#1d9bf1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24
    },
    tweetButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    tweetBoxContainer: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    avatar: {
        width: 42,
        height: 42,
        marginRight: 8,
        marginTop: 10,
        borderRadius: 21,
    },
    input: {
        flex: 1,
        fontSize: 18,
        lineHeight: 28,
        padding: 10,
    }
})