import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function business() {
  return (
    <View>
      <Text style={styles.header}>
        Business Catalog
      </Text>
      {/* Pass in an array for businesses */}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default business