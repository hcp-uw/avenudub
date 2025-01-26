import {Text,Button,View, StyleSheet} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity } from 'react-native';
import business from "./pages/business";

const Tab = createBottomTabNavigator();

export default function App(){
  return(
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: {
            backgroundColor:'#5e30b3',
        },
      }} 
    >
        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name="Businesses" component={business}/>
        <Tab.Screen name="Safety" component={SafetyScreen}/>
      </Tab.Navigator>
  );

} 

const HomeStack = createNativeStackNavigator();

    function HomeStackScreen() {
      return (
        <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={HomeScreen}/>
          <HomeStack.Screen name="Settings" component={SettingsScreen} />
          <HomeStack.Screen name="Reports" component={ReportsScreen} />
        </HomeStack.Navigator>
      );
    }

function SettingsScreen(){
  return(
    <View>
      <Text>Settings! Lame but it exists</Text>
    </View>
  )
}

function ReportsScreen(){
  return(
    <View>
      <Text>For now you will have to rely on word of mouth. Sorry</Text>
    </View>
  );
}

function HomeScreen(){
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return(
    <View style = {styles.container}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button
        title="Go to Reports"
        onPress={() => navigation.navigate('Reports')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-around', // Evenly space buttons 
    alignItems: 'center',
    color:'#5e30b3'
  },
});
// function BusinessScreen() {
//   return(
//     <View>
//       <Text>Welcome to Businesses!</Text>
//     </View>
//   );
// }

function SafetyScreen() {
  return(
    <View>
      <Text>Nothing yet. The world is currently a safe place.</Text>
    </View>
  );
}