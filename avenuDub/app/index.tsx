import {Text, View} from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';

const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
  return(
      <Tab.Navigator 
        screenOptions={{
          tabBarStyle: {
            backgroundColor:'#5e30b3',
        },
      }} 
    >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Settings" component={Settings}/>
        <Tab.Screen name="Business" component={Business}/>
        <Tab.Screen name="Safety" component={Business}/>
      </Tab.Navigator>
  );

} 

function Settings(){
  return(
    <View>
      <Text>Settings! Lame but it exists</Text>
    </View>
  )
}

function Reports(){
  return(
    <View>
      <Text>For now you will have to rely on word of mouth. Sorry</Text>
    </View>
  );
}

function Home(){

  const navigation = useNavigation();

  return(
    <View>
       <Text>This is lame but it will do for now.</Text>
    </View>
  )
}
function Business() {
  return(
    <View>
      <Text>Welcome to Businesses!</Text>
    </View>
  );
}

function Safety() {
  return(
    <View>
      <Text>Nothing yet. The world is currently a safe place.</Text>
    </View>
  );
}

export default TabNavigator
/*
function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    
     <Button onPress={() => navigation.navigate("Business")}>
          Businesses
       </Button>
      <Button color = '#5e30b3' onPress={() => navigation.navigate('Safety')}>
        Safety
      </Button>
    </View>
  );
}
*/