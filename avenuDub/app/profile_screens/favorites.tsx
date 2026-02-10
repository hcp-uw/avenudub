import BackButton from '@/components/BackButton'
import UserContext from '@/components/user-context';
import { themeStore } from '@/stores/theme-store';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Favorites = observer(() => {
  const { user } = useContext(UserContext);
  const { theme } = themeStore;
  
  if (!user.loggedIn) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <BackButton/>
        <Text style={[styles.notLoggedIn, { color: theme.text }]}>
          To view your favorites, you must be logged in.{"\n"}
          Please login through the settings page.
        </Text>
      </View>
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
        <BackButton/>
        <Text style={[styles.title, { color: theme.text}]}>Favorite Locations</Text>
        {/* TODO: Parse favorites from API call */}
        {/* {user.favorites && user.favorites.length > 0 ? (
          user.favorites.map((fav) => (
            <View key={fav.id} style={{ alignSelf: 'stretch', marginBottom: 12 }}>
              <Text style={{ color: theme.text, fontSize: 18 }}>{fav.name}</Text>
            </View>
          ))
        ) : (
          <Text style={[styles.notLoggedIn, { color: theme.text }]}>No favorites yet.</Text>
        )} */}
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
  notLoggedIn: {
    textAlign: 'center',
    fontSize: 15
  },
})

export default Favorites;