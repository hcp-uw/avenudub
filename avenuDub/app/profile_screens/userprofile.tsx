import { ThemeToggle } from '@/components/ThemeToggle';
import { themeStore } from '@/stores/theme-store';
import { useNavigation } from 'expo-router';
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function UserProfile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Information</Text>

      <TouchableOpacity
        style={styles.optionBox}
        onPress={() => (navigation as any).navigate('Settings')}
      >
        <Ionicons name="settings-sharp" color="#fff" size={30} style={styles.icon} />
        <Text style={styles.optionText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionBox}
        onPress={() => (navigation as any).navigate('Favorites')}
      >
        <Ionicons name="bookmarks" color="#fff" size={30} style={styles.icon} />
        <Text style={styles.optionText}>Favorite Locations</Text>
      </TouchableOpacity>
      <View style={styles.optionBox}>
        <Ionicons name="moon" color="#fff" size={30} style={styles.icon} />
        <Text style={styles.optionText}>Dark Mode</Text>
        <ThemeToggle themeStore={themeStore} />
      </View>
      
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
  optionBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#5e30b3',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: 64,
  },
  optionText: {
    fontSize: 25,
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  icon: {
    marginRight: 30,
  },
})