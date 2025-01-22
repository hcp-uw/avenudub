import { Text, View } from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';


export default function Index() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const Tab = createBottomTabNavigator();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <Button color = '#5e30b3' onPress={() => navigation.navigate('pages/business')}>
        Businesses
      </Button>
      <Button color = '#5e30b3' onPress={() => navigation.navigate('pages/safety')}>
        Safety Alerts
      </Button>
    </View>
  );
}
