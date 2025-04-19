import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'

import SafetyHome from './reports_screens/safetyhome'

const Stack = createNativeStackNavigator()

function Reports() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Home" component={SafetyHome} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Reports