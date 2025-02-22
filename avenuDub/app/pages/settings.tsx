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
      setUsername("");
      setPassword("");
    } else {
      setErrors(errors);
    }
  }

  const handleUsername = (newUser: string) => {
    if (errors.includes("username") && newUser) {
      setErrors(element => element.filter(element => element !== "username"));
    }
    setUsername(newUser);
  }

  const handlePassword = (newPW: string) => {
    if (errors.includes("password") && newPW) {
      setErrors(element => element.filter(element => element !== "password"));
    }
    setPassword(newPW);
  }

  const handleLogout = () => {
    setUser({ username, email: "", loggedIn: false})
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
          value={username}
        />
        {errors.includes("username") && 
          <Text style ={{color: "red"}}>
            ⚠ Missing username
          </Text>}
          <Text style={styles.p}>Password:</Text>
        <TextInput secureTextEntry={true} 
          style={[styles.input, errors.includes("password") ? styles.input_error : null]} 
          onChangeText={handlePassword} 
          value={password}/>
        {errors.includes("password") && 
          <Text style ={{color: "red"}}>
            ⚠ Missing password
          </Text>}
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: colors.primary}}>
            Admin Login 
          </Text>
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
      <TouchableOpacity onPress={handleLogout}>
        <Text style = {[styles.p, {color: 'red'}]}>Log out</Text>
      </TouchableOpacity>
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