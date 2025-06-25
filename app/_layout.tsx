import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './Details'; // Make sure this import is correct
import HomeScreen from './HomeScreen'; // Make sure this import is correct


const NativeStack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
          title: 'My home',
          }}
        />
      <NativeStack.Screen name="Details" component={Details} />
    </NativeStack.Navigator>
  );
}
