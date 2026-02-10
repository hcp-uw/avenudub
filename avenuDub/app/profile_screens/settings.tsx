import BackButton from '@/components/BackButton'
import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'
import colors from '@/assets/colors'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { themeStore } from '@/stores/theme-store'
import { observer } from 'mobx-react-lite'
import { FULL_URL } from '@/config'

// add user and email props later
const Settings = observer((props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { theme } = themeStore;
  // TODO: Figure out how to navigate lol
  const navigation = useNavigation();

  async function retrieveSettings(userId: number) {
    const response = await fetch(`/home_screens/settings/${userId}`);
    const data = await response.json();
    if(response.ok){
      const favorites = data.favorites.forEach((item: any[]) => {
        favorites.append(item)
      })
      setUser({username: data.user, email: data.email, userId: userId, favorites: favorites, loggedIn: true})
    }

  }
  async function handleLogin(test: boolean = false) {
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
    if (test) {
      setUser({ username, email: username, userId: 1, favorites: [], loggedIn: true });
      setUsername("");
      setPassword("");
      return;
    }
    try {
      // should prob be a post method since
      // we're sending data (login creds) to the
      // backend
      const response = await fetch(`${FULL_URL}/home_screens/${username}/${password}`);
      const data = await response.json();
      if (response.ok && data.success) {
        console.log("Login successful:", data.success);
        retrieveSettings(data.userID);
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
      <View style={[styles.loginContainer, { backgroundColor: theme.background }]}>
        <BackButton/>
        <Text style={[styles.p, { color: theme.text}]}>Username:</Text>
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
          <Text style={[styles.p, { color: theme.text}]}>Password:</Text>
        <TextInput secureTextEntry={true} 
          style={[styles.input, errors.includes("password") ? styles.input_error : null]} 
          onChangeText={handlePassword} 
          value={password}/>
        {errors.includes("password") && 
          <Text style ={{color: "red"}}>
            ⚠ Missing password
          </Text>}
        <TouchableOpacity onPress={() => props.navigation.navigate("forgot pw")}>
          <Text style={{ color: theme.text}}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={() => handleLogin(true)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Admin Login")}>
          <Text style={[styles.subscripts, { color: theme.text}]}>
            Admin Login 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
          <Text style={[styles.subscripts, { color: theme.text}]}>
            Don't have an account? Sign up for one
          </Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    )
  } 
  else { 
    return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <BackButton/>
      <View style={styles.content}>
        <Text style={[styles.header, { color: theme.text}]}>
          Settings
        </Text>
        <Text style={[styles.p, { color: theme.text}]}>
          Name: {"\n"}{user?.username} {"\n"}{"\n"}
          Email: {"\n"}{user?.email} {"\n"}{"\n"}
          Password: {"\n"}
          {/* TODO: make it so that password initially shows asterisked out, but actually shows when you tap on it */}
          {/* tbh we should prob add a reset password here */}
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonBox} onPress={handleLogout}>
        <Text style = {styles.accText}>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonBox, styles.delAcc]}>
        <Text style = {styles.accText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
    )
  }
})

const styles = StyleSheet.create({
  subscripts : {
    color: colors.primary,
    textAlign: 'center',
    paddingTop: 10
  },
  header: {
    fontSize: 50,
    marginBottom: 20
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
  content: {
    flex: 1,
    width: '100%',
    paddingTop: 60,
    marginLeft: 20
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
  buttonBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 28,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#4a4a4a',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 64,
  },
  delAcc: {
    backgroundColor: '#b00020',
    borderColor: '#b00020',
  },
  accText: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center'
  }
})

export default Settings