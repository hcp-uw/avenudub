import BackButton from '@/components/BackButton'
import { useNavigation } from 'expo-router';
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Touchable } from 'react-native'
import { observer } from 'mobx-react-lite';

const ForgotPW = observer(() => {
  // reset password button should use reset-password route
  async function resetPassword(email: string) {
      // implement reset logic here
      setReset(true);
  }

  const [email, setEmail] = React.useState('')
  const [reset, setReset] = React.useState(false)
  const navigation = useNavigation();

  if (!reset) {
    return (
        <View style={styles.container}>
          <BackButton/>
          <Text style={styles.instructions}>Forgot Password? Enter the email associated with your account to reset it</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={() => resetPassword(email)}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Follow the link sent to your email to reset your password.</Text>
      <Text style={styles.instructions}>Didn't get an email?</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Resend</Text>
      </TouchableOpacity>
      {/* tbh for user sanity, we should prob have an option to go back to reset pw screen in case they put in wrong email */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  )
})

export default ForgotPW

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  instructions: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 0.2,
    borderRadius: 20,
    backgroundColor: '#E9ECF1'
  },
  button: {
    backgroundColor: '#5e30b3',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    minWidth: 100
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
})