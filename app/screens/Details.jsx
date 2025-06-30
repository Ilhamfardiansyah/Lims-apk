import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons';

import axiosConfig from '@/helpers/axiosConfig';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Details({ route, navigation }) {
    const [tweet, setTweet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const devicePlatform = Platform.OS === 'ios' ? 'Twitter for iPhone' : 'Twitter for Android';
    
    useEffect(() => {
        getTweet();
    }, []);

    function getTweet() {
        axiosConfig
        .get(`/api/tweets/${route.params.tweetId}`)
        .then(response => {
            console.log(response.data)
            setTweet(response.data)

            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        })
    }

    function gotoProfile() {
        navigation.navigate('Profile Screens')
    }

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
            ) : (
            <>
            <View style={styles.profileContainer}>
                <TouchableOpacity style={styles.flexRow} onPress={() => gotoProfile()}>
                    <Image style ={styles.avatar} source={{ 
                        uri: tweet.user.avatar
                    }}/>

                    <View>
                        <Text style={styles.tweetName}>{tweet.user.name}</Text>
                        <Text style={styles.tweetHandle}>@{tweet.user.username}</Text>
                    </View>

                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name='dots-three-vertical' size={24} color='gray'></Entypo>
                </TouchableOpacity>
            </View>

            <View style={styles.tweetContentContainer}>
                <Text style={styles.tweetContent}>{tweet.body}</Text>
                <View style={styles.TimestampContainer}>
                    <Text style={styles.TimestampText}>{format(new Date(tweet.created_at), 'h:mm a')}</Text>
                    <Text style={styles.TimestampText}>&middot;</Text>
                    <Text style={styles.TimestampText}>{format(new Date(tweet.created_at), 'd MMM.yy')}</Text>
                    <Text style={styles.TimestampText}>&middot;</Text>
                    <Text style={[styles.TimestampText, styles.linkColor]}>{devicePlatform}</Text>
                </View>
            </View>

            <View style={styles.tweetEngagement}>
                <View style={styles.flexRow}>
                    <Text style={styles.tweetEngagementNumber}>628</Text>
                    <Text style={styles.tweetEngagementLabel}>Retweets</Text>
                </View>
                <View style={[styles.flexRow, styles.ml4]}>
                    <Text style={styles.tweetEngagementNumber}>38</Text>
                    <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
                </View>
                <View style={[styles.flexRow, styles.ml4]}>
                    <Text style={styles.tweetEngagementNumber}>1,987</Text>
                    <Text style={styles.tweetEngagementLabel}>Likes</Text>
                </View>
            </View>

            <View style={[styles.tweetEngagement, styles.spaceAround]}>
                <TouchableOpacity style={styles.flexRow}>
                    <Ionicons 
                        name="chatbubbles-outline" 
                        size={32} 
                        color="gray" 
                        style={{ marginRight: 2 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexRow}>
                    <EvilIcons 
                        name="retweet" 
                        size={32} 
                        color="gray" 
                        style={{ marginRight: 2 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexRow}>
                    <EvilIcons 
                        name="heart" 
                        size={32} 
                        color="gray" 
                        style={{ marginRight: 2 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexRow}>
                    <EvilIcons 
                        name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
                        size={32} 
                        color="gray" 
                        style={{ marginRight: 2 }} />
                </TouchableOpacity>
            </View>
            </>
            )}
        </View>
    
    );
}

const styles = StyleSheet.create({
    container: { 
        flex:1,
        backgroundColor: "white",
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    flexRow: {
        flexDirection: 'row',
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 8,
        borderRadius: 25,
    },
    tweetName: {
        fontWeight: 'bold',
        color: '#222222',
    },
    tweetHandle: {
        color: 'gray',
        marginTop: 4,
    },
    tweetContentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    tweetContent: {
        fontSize: 20,
        lineHeight: 30,
    },
    tweetEngagement: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    tweetEngagementNumber: {
        fontWeight: 'bold',
    },
    tweetEngagementLabel: {
        fontWeight: 'gray',
        marginLeft: 6,
    },
    ml4: {
        marginLeft: 16,
    },
    spaceAround: {
        justifyContent: 'space-around',
    },
    TimestampContainer: {
        flexDirection: "row",
        marginTop: 12,
    },
    TimestampText: {
        color: "gray",
        marginRight: 6,
    },
    linkColor: {
        color: '#1d9bf1'
    }
})