import RenderItem from '@/components/RenderItem';
import axiosConfig from '@/helpers/axiosConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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
    id: string;
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
  const [forceRefresh, setForceRefresh] = useState(false);

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
      setForceRefresh(prev => !prev);
    }
  }, [page]);

  const handleEnd = useCallback(() => {
    if (!isEndOfScrolling && !isPaginating && !isRefreshing) {
      setIsPaginating(true);
      setPage(prev => prev + 1);
    }
  }, [isEndOfScrolling, isPaginating, isRefreshing]);

  const gotoProfile = useCallback((userId: string) => {
    navigation.push('Profile Screens', {
      userId: userId,
    });
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
      <RenderItem
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
          keyExtractor={(item, index)=> `${item.id}-$(index)`}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
