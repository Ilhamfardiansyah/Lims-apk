    // components/RenderItem.tsx

    import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatDistanceToNowStrict } from 'date-fns';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

    export default function RenderItem({ item, gotoProfile, gotoSingleTweet }) {
    return (
        <View style={styles.tweetContainer}>
        <TouchableOpacity onPress={() => gotoProfile(item.user.id)}>
            <Image style={styles.avatar} source={{ uri: item.user.avatar }} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.row} onPress={() => gotoProfile(item.user.id)}>
            <Text style={styles.tweetName}>{item.user.name}</Text>
            <Text style={styles.tweetHandle}>@{item.user.username}</Text>
            <Text> · </Text>
            <Text>{formatDistanceToNowStrict(new Date(item.created_at))}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => gotoSingleTweet(item.id)}>
            <Text style={styles.tweetContent}>{item.body}</Text>
            </TouchableOpacity>

            <View style={styles.tweetEngagement}>
            <TouchableOpacity style={styles.row}>
                <Ionicons name="chatbubbles-outline" size={18} color="gray" />
                <Text style={styles.textGray}>456</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <AntDesign name="retweet" size={18} color="gray" />
                <Text style={styles.textGray}>123</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <AntDesign name="hearto" size={18} color="gray" />
                <Text style={styles.textGray}>99</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
                <EvilIcons name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'} size={22} color="gray" />
                <Text style={styles.textGray}>42</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
    tweetContainer: {
        flexDirection: 'row',
        padding: 12,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    tweetName: {
        fontWeight: 'bold',
        color: '#222',
    },
    tweetHandle: {
        color: 'gray',
        marginHorizontal: 4,
    },
    tweetContent: {
        marginTop: 4,
        marginBottom: 8,
    },
    tweetEngagement: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    textGray: {
        color: 'gray',
        marginLeft: 4,
    },
    });
