import BackButton from '@/components/BackButton'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function Business() {
  return (
    <View style={styles.container}>
      <BackButton/>
      <Text style={styles.header}>
        Business Catalog
      </Text>
      {/* Pass in an array for businesses */}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: "black"
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 0,
  },
})

export default Business