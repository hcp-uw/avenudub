import BackButton from '@/components/BackButton'
import { themeStore } from '@/stores/theme-store';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Favorites = observer(() => {
  const { theme } = themeStore;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
        <BackButton/>
        <Text style={[styles.title, { color: theme.text}]}>Favorite Locations</Text>
    </View>
  )
})

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

export default Favorites;