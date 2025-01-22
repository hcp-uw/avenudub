import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function settings(user: string, email: string, password: string) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {user}'s Settings
      </Text>
      <Text>
        Name: {user} {"\n"}
        Email: {email} {"\n"}
        Password: {"\n"}
      </Text>
      <View style={styles.separator} />
      <Text>
        Favorite Locations: {"\n"}
        {/* Pass in an array here?? */}
      </Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 0,
    backgroundColor : "#5e30b3"
  },
})

export default settings