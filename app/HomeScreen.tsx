import { Button } from '@react-navigation/elements';
import { Text, View } from "react-native";


export default function HomeScreen({navigation}: {navigation: any}) {
  return (
    <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      <Text>Home Screen</Text>
        <Button onPress={() => navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          }) 
        }>
          Go to Details
        </Button>
    </View>
  );
}
