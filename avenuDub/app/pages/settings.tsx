import BackButton from '@/components/BackButton'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'
import colors from '@/assets/colors'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

// add user and email props later
function Settings() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      setUser({ username, email: username, loggedIn: true });
    }
  }

  if (!user.loggedIn) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.loginContainer}>
        <BackButton/>
        <Text style={styles.p}>Username:</Text>
        <TextInput style={styles.input} 
          onChangeText={setUsername} 
          value={username}/>
          <Text style={styles.p}>Password:</Text>
        <TextInput secureTextEntry={true} 
          style={styles.input} 
          onChangeText={setPassword} 
          value={password}/>
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    )
  } 

  else { 
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
    paddingTop: 50,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 150,
    height: 55,
    borderRadius: 20,
    marginTop: 30
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
})

export default Settings