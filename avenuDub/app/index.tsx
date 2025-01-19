import { Text, View } from "react-native";
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements';


export default function Index() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button onPress={() => navigation.navigate('pages/business')}>
        Business
      </Button>
    </View>
  );
}
