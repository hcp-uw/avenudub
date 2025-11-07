import BackButton from '@/components/BackButton'
import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'
import colors from '@/assets/colors'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// add user and email props later
function Settings(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  // TODO: Figure out how to navigate lol
  const navigation = useNavigation();

  async function retrieveSettings(userId: number) {
    const response = await fetch(`/home_screens/${userId}`);
    const data = await response.json();
    if(response.ok){
      const favorites = data.favorites.map((favorite: string) => {
        <Text>{favorite}</Text>
      })
      setUser({username: data.user, email: data.email, userId: userId, favorites: favorites, loggedIn: true})
    }

  }
  async function handleLogin() {
    let errors = []
    if (!username) {
      errors.push("username")
    }
    if (!password) {
      errors.push("password");
    }
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    try {
      // should prob be a post method since
      // we're sending data (login creds) to the
      // backend
      const response = await fetch(`/home_screens/${username}/${password}`);
      const data = await response.json();
      if (response.ok && data.logInSuccess) {
        console.log("Login successful:", data.logInSuccess);
        retrieveSettings(data.userId);
      } else {
        console.error("Login failed:", data.error || "Unknown error");
        // should have some pop up where log in failed
      }
    } catch (err) {
      console.error("Network or unexpected error:", err);
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
    setUser({ username, email: "", userId: 0, favorites: [], loggedIn: false})
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
        <TouchableOpacity onPress={() => props.navigation.navigate("forgot pw")}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Admin Login")}>
          <Text style={styles.subscripts}>
            Admin Login 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.subscripts}>
            Don't have an account? Sign up for one
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
        {user?.favorites}
      </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style = {[styles.p, {color: 'red'}]}>Log out</Text>
      </TouchableOpacity>
    </View>
    )
  }
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
    backgroundColor: '#ffffffff',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffffff',
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