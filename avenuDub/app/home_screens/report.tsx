import colors from '@/assets/colors'
import BackButton from '@/components/BackButton'
import React, { useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
import UserContext from '@/components/user-context'
import { useContext } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { themeStore } from '@/stores/theme-store'
import { observer } from 'mobx-react-lite'

const Report = observer(() => {
  const { user } = useContext(UserContext);
  const { theme } = themeStore;

  if (!user.loggedIn) {
    return (
      <View style={[styles.notLoggedInContainer, { backgroundColor: theme.background }]}>
        <BackButton/>
        <Text style={[styles.notLoggedIn, { color: theme.text }]}>
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
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    function sendReport(){
      fetch(`/home_screens/report/${title}/${location}/${desc}`, {
        method: "POST",
      }).then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
    }
    sendReport();
  }, [title, location, desc]);

  const handleReport = () => {
    let errors = [];
    if (!title) {
      errors.push("title");
    }
    if (!location) {
      errors.push("location");
    }
    if (!desc) {
      errors.push("desc")
    }
    if (errors.length === 0) {
      toggleModal(!modalVisible);
      setTitle("");
      setLocation("");
      setDesc("");
    } else {
      setErrors(errors);
    }
  }

  const changeTitle = (newTitle: string) => {
    if (errors.includes("title") && newTitle) {
      setErrors(element => element.filter(element => element !== "title"));
    }
    setTitle(newTitle);
  }
  const changeLocation = (newLoc: string) => {
    if (errors.includes("location") && newLoc) {
      setErrors(element => element.filter(element => element !== "location"));
    }
    setLocation(newLoc);
  }
  const changeDesc = (newDesc: string) => {
    if (errors.includes("desc") && newDesc) {
      setErrors(element => element.filter(element => element !== "desc"));
    }
    setDesc(newDesc)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <BackButton/>
      <ScrollView>
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
      <Text style={[styles.header, { color: theme.text }]}>
        Report a {"\n"}Hazard
      </Text>
      <Text style={[styles.p, { color: theme.text }]}>
        Report Title
      </Text>
      <TextInput 
       placeholder='Title' 
       style={[styles.input, errors.includes("title") ? styles.inputError : null]}
       value={title}
       onChangeText={changeTitle}
      />
      {errors.includes("title") &&
        <Text style={{color: "red"}}>
        ⚠ Please input a title
        </Text>}
      <Text style={[styles.p, { color: theme.text }]}>
        Location
      </Text>
      <TextInput 
       placeholder='Location'
       style={[styles.input, errors.includes("location") ? styles.inputError : null]}
       value={location}
       onChangeText={changeLocation}
      />
      {errors.includes("location") &&
        <Text style={{color: "red"}}>
        ⚠ Please input a location
        </Text>}
      <Text style={[styles.p, { color: theme.text }]}>
        Description
      </Text>
      <TextInput
        placeholder='Description'
        multiline={true}
        style={[styles.inputDescription, errors.includes("desc") ? styles.inputError : null]}
        value={desc}
        onChangeText={changeDesc}
      />
      {errors.includes("desc") && 
        <Text style={{color: "red"}}>
        ⚠ Please input a description
        </Text>}
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.submitButton} onPress={handleReport}>
        <Text style={styles.buttonText}>Submit report</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
    </TouchableWithoutFeedback>
  )
})

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
    borderRadius: 10,
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
  p: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5
  },
  closeButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 125,
    height: 45,
    borderRadius: 10,
    marginTop: 30,
  },
  notLoggedIn: {
    textAlign: 'center',
    fontSize: 15
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2e8dc',
  },
  header: {
    fontSize: 50,
    textAlign: 'left',
  },
  container: {
    flex: 1,
    marginHorizontal: 0,
    padding: 30,
    paddingTop: 100,
    backgroundColor: '#ffffffff',
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 2,
    backgroundColor: '#E9ECF1'
  },
  inputError: {
    borderColor: "red"
  },
  inputDescription: {
    height: 250,
    borderWidth: 0.5,
    borderRadius: 2,
    backgroundColor: '#E9ECF1'
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

export default Report;