import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import BusinessHome from './business_screens/businesshome'
import BusinessesInfoScreen from './business_screens/businessinfo'
const Stack = createNativeStackNavigator()

function Business() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "business home" component={BusinessHome} options={{headerShown: false}}/>
      <Stack.Screen name = "BusinessesInfo" component={BusinessesInfoScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Business