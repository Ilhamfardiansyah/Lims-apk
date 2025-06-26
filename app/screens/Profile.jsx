import { EvilIcons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
    const DATA = [
        { id: '1', title: 'First Item' },
        { id: '2', title: 'Second Item' },
        { id: '3', title: 'Third Item' },
        { id: '4', title: 'Fourth Item' },
        { id: '5', title: 'Fifth Item' },
        { id: '6', title: 'Sixth Item' },
        { id: '7', title: 'Seventh Item' },
        { id: '8', title: 'Eighth Item' },
        { id: '9', title: 'Ninth Item' },
        { id: '10', title: 'Tenth Item' },
    ];

    const renderItem = ({ item }) => (
        <View style={{ marginVertical: 20 }}>
            <Text>{item.title}</Text>
        </View>
    )

    const ProfileHeader = () => (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={{ 
                uri: 'https://img.freepik.com/free-vector/dark-hexagonal-background-with-gradient-color_79603-1410.jpg'
                }}
            />
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ 
                    uri: 'https://i.pravatar.cc/150?img=3'
                }}
                />
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.nameContainer}>
                <Text style={styles.profileName}>Ilham Fardiansyah</Text>
                <Text style={styles.profileHandle}>@Ilhamf</Text>
            </View>

            <View style={styles.profileContainer}>
                <Text style={styles.profileContainerText}>
                    Ceo, Faounder, Influencer, HTML, CSS, Bootstrap, Javascript
                </Text>
            </View>

            <View style={styles.locationContainer}>
                <EvilIcons 
                    name="location" 
                    size={24} 
                    color="gray"/>
                <Text style={styles.textGray}>Bekasi, Indonesia</Text>
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
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.tweetSeparator}></View>}
            ListHeaderComponent={ProfileHeader}
            />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgrounColor: 'white'
    },
    backgroundImage: {
        width: 800,
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
        marginTop: -34

    },
    followButton: {
        backgroundColor: '#0f1418',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 24
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
        color: "gray",
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
        borderBottomColor: '#e5e7eb'
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb'
    },
})
