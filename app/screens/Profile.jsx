    import RenderItem from '@/components/RenderItem';
import axiosConfig from '@/helpers/axiosConfig';
import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

    export default function Profile({ route, navigation }) {
    const { userId } = route.params;

    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isEndOfScrolling, setIsEndOfScrolling] = useState(false);

    useEffect(() => {
        setUser(null); // reset saat ganti userId
        setData([]);
        setPage(1);
        fetchProfile();
        fetchTweets(1);
    }, [userId]);

    const fetchProfile = async () => {
        try {
        const res = await axiosConfig.get(`/api/users/${userId}`);
        setUser(res.data);
        } catch (error) {
        console.log('Error fetching profile:', error);
        } finally {
        setIsLoading(false);
        }
    };

    const fetchTweets = async (pageToLoad = 1) => {
        try {
        const res = await axiosConfig.get(`/api/users/${userId}/tweets?page=${pageToLoad}`);
        if (pageToLoad === 1) {
            setData(res.data.data);
        } else {
            setData(prev => [...prev, ...res.data.data]);
        }
        setIsEndOfScrolling(!res.data.next_page_url);
        } catch (error) {
        console.log('Error fetching tweets:', error);
        }
    };

    const handleLoadMore = () => {
        if (!isEndOfScrolling) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchTweets(nextPage);
        }
    };

    const ProfileHeader = () => {
        if (!user) {
        return (
            <View style={{ padding: 20 }}>
            <ActivityIndicator size="large" color="gray" />
            </View>
        );
        }

        return (
        <>
            <Image style={styles.backgroundImage} source={{ uri: 'https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg' }} />
            <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: user.avatar }} />
            <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileHandle}>@{user.username}</Text>
            </View>
            <View style={styles.profileContainer}>
            <Text style={styles.profileContainerText}>{user.profile}</Text>
            </View>
            <View style={styles.locationContainer}>
            <EvilIcons name="location" size={24} color="gray" />
            <Text style={styles.textGray}>
                {user.location} {user.link} {user.linkText}
            </Text>
            </View>
            <View style={styles.followContainer}>
            <View style={styles.followItem}>
                <Text style={styles.followNumber}>509</Text>
                <Text style={styles.followItemLabel}>Following</Text>
            </View>
            <View style={[styles.followItem, styles.ml4]}>
                <Text style={styles.followNumber}>22,1 M</Text>
                <Text style={styles.followItemLabel}>Followers</Text>
            </View>
            </View>
            <View style={styles.separator}></View>
        </>
        );
    };

    return (
        <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={ProfileHeader}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backgroundImage: {
        width: '100%',
        height: 120,
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginHorizontal: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        marginTop: -34,
    },
    followButton: {
        backgroundColor: '#1d9bf1',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24,
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    profileName: {
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 22,
    },
    profileHandle: {
        paddingHorizontal: 10,
        color: 'gray',
        marginTop: 1,
    },
    profileContainer: {
        paddingHorizontal: 10,
        marginTop: 8,
    },
    profileContainerText: {
        lineHeight: 22,
    },
    textGray: {
        color: 'gray',
    },
    locationContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 12,
    },
    followContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    followItem: {
        flexDirection: 'row',
    },
    followNumber: {
        fontWeight: 'bold',
    },
    followItemLabel: {
        marginLeft: 4,
    },
    ml4: {
        marginLeft: 16,
    },
    tweetSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    });
