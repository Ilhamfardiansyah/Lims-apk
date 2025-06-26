import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";

import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import { FlatList } from "react-native-gesture-handler";

export default function HomeScreen({navigation}: {navigation: any}) {
type Tweet = {
  id: string;
  title: string;
  user: {
    name: string;
    [key: string]: any;
  };
  [key: string]: any;
};

const [data, setData] = useState([]);

useEffect(() => {
  getAllTweets();
}, [])

function getAllTweets() {
  axios.get('http://192.168.0.3/api/tweets')
    .then(response => {
      // console.log(response.data);
      return setData(response.data);
    })
    .catch(error => {
      console.log(error); 
    })
}

function gotoProfile() {
  navigation.navigate('Profile')
}

function gotoSingleTwwet() {
  navigation.navigate('Details')
}

function gotoNewTweet() {
  navigation.navigate('Beranda')
}

const renderItem = ({item}: {item: {
  user: any;id: string; title: string
}}) => (

  <View style={styles.tweetContainer}>
    <TouchableOpacity onPress={() => gotoProfile()}>
        <Image style ={styles.avatar} source={{ 
          uri: item.user.avatar
        }}/>
    </TouchableOpacity>

    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.flexRow} onPress={()=> gotoProfile()}>
        <Text numberOfLines={1}
          style={styles.tweetName}>{item.user.name}</Text>
        <Text numberOfLines={1}
          style={styles.tweetHandle}>@{item.user.username}</Text>
        <Text>&middot;</Text>
        <Text numberOfLines={1}
        >{formatDistanceToNowStrict(new Date(item.created_at))}</Text>                                    
      </TouchableOpacity> 

      <TouchableOpacity style={styles.tweetContentContainer} onPress={()=> gotoSingleTwwet()}>
        <Text style={styles.tweetContent}>{item.body}</Text>
      </TouchableOpacity>

      <View style={styles.tweetEngagement}>
        <TouchableOpacity style={styles.flexRow}>
          <Ionicons 
            name="chatbubbles-outline" 
            size={18} 
            color="gray" 
            style={{ marginRight: 2 }} />
          <Text style={styles.textGray}>456</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
          <AntDesign 
            name="retweet" 
            size={18} 
            color="gray" 
            style={{ marginRight: 2 }} />
          <Text style={styles.textGray}>456</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
          <AntDesign 
            name="hearto" 
            size={18} 
            color="gray" 
            style={{ marginRight: 2 }} />
          <Text style={styles.textGray}>20,156</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
          <EvilIcons 
            name={Platform.OS === 'ios' ? 'share-apple' : 'share-google'}
            size={18} 
            color="gray" 
            style={{ marginRight: 2 }} />
          <Text style={styles.textGray}>20,156</Text>
        </TouchableOpacity>

      </View>
    </View>
  </View>
)
  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item=>item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeparator}></View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => gotoNewTweet()}
      >
        <AntDesign name="plus" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex:1,
    backgroundColor: "white"
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
    flexDirection: "row"
  },
  tweetName: {
    fontWeight: "bold",
    color: "#222222"
  },
  tweetHandle: {  
    marginHorizontal: 8,
    color: "gray"
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
    color: "gray",
  },
  ml4: {
    marginLeft: 16,
  },
  tweetSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d9bf1",
    position: "absolute",
    bottom: 20,
    right: 12
  }
})

