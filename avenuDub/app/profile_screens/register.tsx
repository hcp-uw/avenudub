import colors from '@/assets/colors';
import BackButton from '@/components/BackButton';
import UserContext from '@/components/user-context';
import { useNavigation } from 'expo-router';
import React, { useContext, useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

function Register() {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // TODO: Figure out how to navigate lol
  const navigation = useNavigation();

  async function retrieveSettings(userId: number) {
    try {
      const response = await fetch(`/api/users/${userId}/settings`);
      const data = await response.json();
      if (response.ok) {
        const favorites = Array.isArray(data.favorites) ? data.favorites : [];
        setUser({ username: data.user || data.username || '', email: data.email || '', userId: userId, favorites: favorites, loggedIn: true });
      }
    } catch (err) {
      console.error('Failed to retrieve settings:', err);
    }

  }
  async function handleRegister() {
    let errors = []
    if (!username) {
      errors.push("username")
    }
    if (!email) {
      errors.push("email");
    }
    if (!password) {
      errors.push("password");
    }
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    try {
      setLoading(true);
      const payload = {
        username: username,
        email: email,
        password: password
      }
      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      if (response.ok) {
        const newUserId = resData.userId || resData.id || 0;
        const favorites = Array.isArray(resData.favorites) ? resData.favorites : [];
        setUser({ username: resData.username || username, 
                  email: resData.email || email, 
                  userId: newUserId, favorites: favorites, loggedIn: true });
        try { (navigation as any).navigate('Home'); } catch {}
      } else {
        // server returned an error
        const msg = resData?.message || resData?.error || 'Registration failed';
        setErrors(prev => [...prev, msg]);
      }

    } catch (err) {
      console.error("Network or unexpected error:", err);
      setErrors(prev => [...prev, 'Network error']);
    } finally {
      setLoading(false);
    }
  }

  const handleUsername = (newUser: string) => {
    if (errors.includes("username") && newUser) {
      setErrors(element => element.filter(element => element !== "username"));
    }
    setUsername(newUser);
  }

  const handleEmail = (email: string) => {
    if (errors.includes("email") && email) {
      setErrors(element => element.filter(element => element !== "email"));
    }
    setEmail(email);
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
      {/* Note: backend already handles checking if email is in valid format */}
      <Text style={styles.p}>Email:</Text>
      <TextInput style={[
          styles.input, errors.includes("email") ? styles.input_error : null
          ]} 
        onChangeText={handleEmail} 
        value={email}
      />
      {errors.includes("email") && 
        <Text style ={{color: "red"}}>
          ⚠ Missing email
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
      <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Back to Login</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  )        
}

const styles = StyleSheet.create({
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
  submitButtonDisabled: {
    opacity: 0.6
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

export default Register;