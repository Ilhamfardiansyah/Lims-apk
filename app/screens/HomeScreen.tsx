import axiosConfig from '@/helpers/axiosConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatDistanceToNowStrict } from 'date-fns';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<Tweet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isEndOfScrolling, setIsEndOfScrolling] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false); // untuk memaksa fetch ulang

  useEffect(() => {
    fetchTweets();
  }, [page, forceRefresh]);

  const fetchTweets = async () => {
    try {
      const response = await axiosConfig.get(`/api/tweets?page=${page}`);
      const newData = response.data.data;

      if (page === 1) {
        setData(newData);
      } else {
        setData(prev => [...prev, ...newData]);
      }

      setIsEndOfScrolling(!response.data.next_page_url);
    } catch (error) {
      console.log('Error fetching tweets:', error);
    }

    setIsLoading(false);
    setIsRefreshing(false);
    setIsPaginating(false);
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setIsEndOfScrolling(false);
    if (page !== 1) {
      setPage(1);
    } else {
      setForceRefresh(prev => !prev); // memaksa trigger ulang useEffect
    }
  }, [page]);

  const handleEnd = useCallback(() => {
    if (!isEndOfScrolling && !isPaginating && !isRefreshing) {
      setIsPaginating(true);
      setPage(prev => prev + 1);
    }
  }, [isEndOfScrolling, isPaginating, isRefreshing]);

  const gotoProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const gotoSingleTweet = useCallback((tweetId: string) => {
    navigation.navigate('Details', { tweetId });
  }, [navigation]);

  const gotoNewTweet = useCallback(() => {
    navigation.navigate('Beranda');
  }, [navigation]);

  const renderFooter = () => {
    if (isPaginating) {
      return (
        <View style={styles.footerLoading}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    }

    if (isEndOfScrolling) {
      return (
        <View style={styles.footerEnd}>
          <Text style={{ color: 'gray' }}>Tidak ada lagi data</Text>
        </View>
      );
    }

    return null;
  };

  const renderItem = useCallback(
    ({ item }: { item: Tweet }) => (
      <TweetItem
        item={item}
        gotoProfile={gotoProfile}
        gotoSingleTweet={gotoSingleTweet}
      />
    ),
    [gotoProfile, gotoSingleTweet]
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
          onEndReached={handleEnd}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
          removeClippedSubviews={true}
          getItemLayout={(_, index) => ({
            length: 110,
            offset: 110 * index,
            index,
          })}
        />
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={gotoNewTweet}>
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const TweetItem = memo(({ item, gotoProfile, gotoSingleTweet }: {
  item: Tweet;
  gotoProfile: () => void;
  gotoSingleTweet: () => void;
}) => (
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

      <TouchableOpacity style={styles.tweetContentContainer} onPress={() => gotoSingleTweet(item.id)}>
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
));

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
  footerLoading: {
    paddingVertical: 20,
  },
  footerEnd: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
