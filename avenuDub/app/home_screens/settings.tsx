import BackButton from '@/components/BackButton'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'
import colors from '@/assets/colors'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// add user and email props later
function Settings(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  const { user, setUser } = useContext(UserContext);
  const userID = user.userID;
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  // const navigation = useNavigation();

  const handleLogout = () => {
    setUser({ username: '', email: '', userID: -1, loggedIn: false });
    props.navigation.navigate("Gen Login")
  }

  useEffect(() => {
    if (userID) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const backendURL = 'http://10.0.0.180:5000'; // expo url
          const response = await fetch(`${backendURL}/home_screens/settings${userID}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setUser({ username: user.username, email: user.username, userID: -1, loggedIn: false });
          setFavorites(data.favorites);
          setLoading(false);
        } catch (error) {
          console.error("error fetching data in server-side")
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      console.error("no user id provided :(")
      setLoading(false);
    }
  }, [userID]);

  if (loading) {
    return (
      <View style={styles.container}>
        <BackButton />
        <Text style={styles.header}>Loading Settings...</Text>
      </View>
    );
  }

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
      {favorites.map((location, index) => (
        <Text key={index}>{location}</Text>
      ))}
    </Text>
    <TouchableOpacity onPress={handleLogout}>
      <Text style = {[styles.p, {color: 'red'}]}>Log out</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  subscripts : {
    color: colors.primary,
    textAlign: 'center',
    paddingTop: 10
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
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
    paddingTop: 50,
    backgroundColor: '#f2e8dc',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2e8dc',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 2,
    backgroundColor: '#E9ECF1'
  },
  input_error: {
    borderColor: 'red'
  },
  submitButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 285,
    height: 55,
    borderRadius: 5,
    marginTop: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
})

export default Settings