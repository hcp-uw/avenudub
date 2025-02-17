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
  const [errors, setErrors] = useState<string[]>([]);

  const handleLogin = () => {
    let errors = []
    if (!username) {
      errors.push("username")
    }
    if (!password) {
      errors.push("password");
    }
    if (errors.length == 0) {
      setUser({ username, email: username, loggedIn: true });
    } else {
      setErrors(errors);
    }
  }

  const handleUsername = (newUser: string) => {
    if (errors.includes("username") && username) {
      setErrors(element => element.filter(element => element !== "username"));
    }
    setUsername(newUser);
  }

  const handlePassword = (newPW: string) => {
    if (errors.includes("password") && password) {
      setErrors(element => element.filter(element => element !== "password"));
    }
    setPassword(newPW);
  }

  if (!user.loggedIn) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.loginContainer}>
        <BackButton/>
        <Text style={styles.p}>Username:</Text>
        <TextInput style={[
            styles.input, errors.includes("username") ? styles.input_error : null
            ]} 
          onChangeText={handleUsername} 
          value={username}/>
          <Text style={styles.p}>Password:</Text>
        <TextInput secureTextEntry={true} 
          style={[styles.input, errors.includes("password") ? styles.input_error : null]} 
          onChangeText={handlePassword} 
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
  input_error: {
    borderColor: 'red'
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