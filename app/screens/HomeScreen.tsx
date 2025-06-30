import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }) {
  type Tweet = {
    id: string;
    title: string;
    body: string;
    created_at: string;
    user: {
      name: string;
      username: string;
      avatar: string;
    };
  };

  const [data, setData] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getAllTweets();
  }, []);

  const getAllTweets = async () => {
    try {
      const response = await axios.get('http://192.168.0.2/api/tweets');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    getAllTweets();
  };

  const gotoProfile = () => navigation.navigate('Profile');
  const gotoSingleTweet = () => navigation.navigate('Details');
  const gotoNewTweet = () => navigation.navigate('Beranda');

  const renderItem = ({ item }: { item: Tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={gotoProfile}>
        <Image style={styles.avatar} source={{ uri: item.user.avatar }} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={gotoProfile}>
          <Text numberOfLines={1} style={styles.tweetName}>{item.user.name}</Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>@{item.user.username}</Text>
          <Text> · </Text>
          <Text numberOfLines={1}>
            {formatDistanceToNowStrict(new Date(item.created_at))}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tweetContentContainer} onPress={gotoSingleTweet}>
          <Text style={styles.tweetContent}>{item.body}</Text>
        </TouchableOpacity>

        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <Ionicons name="chatbubbles-outline" size={18} color="gray" style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <AntDesign name="retweet" size={18} color="gray" style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <AntDesign name="hearto" size={18} color="gray" style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>20,156</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <EvilIcons name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'} size={18} color="gray" style={{ marginRight: 2 }} />
            <Text style={styles.textGray}>20,156</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="gray" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.tweetSeparator} />}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
        />
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={gotoNewTweet}>
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  flexRow: {
    flexDirection: 'row',
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    marginHorizontal: 8,
    color: 'gray',
  },
  tweetContent: {
    lineHeight: 20,
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  textGray: {
    color: 'gray',
  },
  ml4: {
    marginLeft: 16,
  },
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf1',
    position: 'absolute',
    bottom: 20,
    right: 12,
  },
});


