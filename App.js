import 'react-native-gesture-handler';
import { StyleSheet, StatusBar,Text } from 'react-native';
import Routing from './src/Routing/Routing';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer >
      <StatusBar backgroundColor="skyblue"  barStyle="light-content" />
      <Routing/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
