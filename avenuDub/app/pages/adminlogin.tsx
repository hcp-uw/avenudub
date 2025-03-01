import colors from '@/assets/colors';
import BackButton from '@/components/BackButton';
import UserContext from '@/components/user-context';
import React, { useContext, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

function adminlogin() {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.loginContainer}>
      <Text style={styles.header}>
        Admin Login
      </Text>
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
        <Text style={{ color: 'blue', marginTop: 10 }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )        
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
  },
  p: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10
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
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})

export default adminlogin;