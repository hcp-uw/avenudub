import colors from '@/assets/colors'
import BackButton from '@/components/BackButton'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

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
  const [modalVisible, toggleModal] = useState(false);

  const handleReport = () => {
    if (title && location && desc) {
      toggleModal(!modalVisible);
      setTitle("");
      setLocation("");
      setDesc("");
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <BackButton/>
      <Modal
       animationType='none'
       transparent={true}
       visible={modalVisible}
       onRequestClose={() =>
         toggleModal(!modalVisible)
       }>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text>
            Report successfully sent!
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal((curr) => !curr)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.header}>
        Report a {"\n"}Hazard
      </Text>
      <Text>
        Report Title
      </Text>
      <TextInput 
       placeholder='Title' 
       style={styles.input}
       value={title}
       onChangeText={setTitle}
      />
      <Text>
        Location
      </Text>
      <TextInput 
       placeholder='Location'
       style={styles.input}
       value={location}
       onChangeText={setLocation}
      />
      <Text>
        Description
      </Text>
      <TextInput
        placeholder='Description'
        multiline={true}
        style={styles.inputDescription}
        value={desc}
        onChangeText={setDesc}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.submitButton} onPress={handleReport}>
        <Text style={styles.buttonText}>Submit report</Text>
      </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 125,
    height: 45,
    borderRadius: 20,
    marginTop: 20,
  },
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