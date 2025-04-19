import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'

import Safety from './reports_screens/safety'

const Stack = createNativeStackNavigator()

function Reports() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Safety" component={Safety} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Reports