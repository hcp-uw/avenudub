import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'

function forgotPW() {
    // reset password button should use reset-password route
    async function resetPassword(email: string) {
        
    }
  return (
    <View>
      <Text>Forgot Password? Enter the email associated with your account to reset it</Text>
      <TextInput placeholder="Email" />
      <Button title="Reset Password" onPress={() => {}} />
    </View>
  )
}

export default forgotPW