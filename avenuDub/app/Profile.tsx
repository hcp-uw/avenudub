import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'

import ProfileHome from './reports_screens/safetyhome'

const Stack = createNativeStackNavigator()

function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Home" component={ProfileHome} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Profile