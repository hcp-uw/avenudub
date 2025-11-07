import BackButton from '@/components/BackButton'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Favorites() {
  return (
    <View style={styles.container}>
        <BackButton/>
        <Text style={styles.title}>Favorite Locations</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginHorizontal: 0,
    padding: 30,
    paddingTop: 0,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 40,
    fontWeight: '500',
    marginBottom: 16,
    color: '#333',
  },
})
