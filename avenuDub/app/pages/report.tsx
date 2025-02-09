import colors from '@/assets/colors'
import BackButton from '@/components/BackButton'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'

function Report() {
  const { user } = useContext(UserContext);
  if (!user.loggedIn) {
    return (
      <View style={styles.notLoggedInContainer}>
        <BackButton/>
        <Text style={styles.notLoggedIn}>
          In order to prevent spam, you must be logged in to submit a report.{"\n"}
          Please login through the settings page.
        </Text>
      </View>
    )
  }
  // states for report page
  // stores the title of report
  const [title, setTitle] = useState("");
  // stores the location of report (string input is temporary for now)
  const [location, setLocation] = useState("");
  // stores description of report
  const [desc, setDesc] = useState("");
  // determines if modal for when report is sent successfully/unsuccessfully is shown
  const [modalVis, toggleModal] = useState(false);
  return (
    <View style={styles.container}>
      <BackButton/>
      <Text style={styles.header}>
        Report a {"\n"}Hazard
      </Text>
      <Text>
        Report Title
      </Text>
      <TextInput 
       placeholder='Title' 
       style={styles.input}
       onChangeText={setTitle}
      />
      <Text>
        Location
      </Text>
      <TextInput 
       placeholder='Location'
       style={styles.input}
       onChangeText={setLocation}
      />
      <Text>
        Description
      </Text>
      <TextInput
        placeholder='Description'
        multiline={true}
        style={styles.inputDescription}
        onChangeText={setDesc}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.submitButton} onPress={() => toggleModal((curr) => !curr)}>
        <Text style={styles.buttonText}>Submit report</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  notLoggedIn: {
    textAlign: 'center',
    fontSize: 15
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    marginHorizontal: 0,
    padding: 30,
    paddingTop: 50
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5
  },
  inputDescription: {
    height: 250,
    borderWidth: 1,
    borderRadius: 5
  },
  submitButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: 225,
    height: 60,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  buttonContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Report