import BackButton from '@/components/BackButton'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'

// add user and email props later
function Settings() {
  const user = useContext(UserContext);

  return (
    <View style={styles.container}>
      <BackButton/>
      <Text style={styles.header}>
        {user?.username}'s {"\n"}Settings
      </Text>
      <Text style={styles.p}>
        Name: {user?.username} {"\n"}
        Email: {user?.email} {"\n"}
        Password:
      </Text>
      <View style={styles.separator} />
      <Text style={styles.p}>
        Favorite Locations: {"\n"}
        {/* Pass in an array here?? */}
        <Text>[Location]</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50
  },
  p: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    marginHorizontal: 0,
    padding: 30,
    paddingTop: 50
  },
})

export default Settings