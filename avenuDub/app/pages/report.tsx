import BackButton from '@/components/BackButton'
import React from 'react'
import { Text, View } from 'react-native'

function report() {
  return (
    <View style={{backgroundColor : "#5e30b3"}}>
      <BackButton/>
      <Text>
        report
      </Text>
    </View>
  )
}

export default report