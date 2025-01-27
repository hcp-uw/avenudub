import colors from '@/assets/colors'
import BackButton from '@/components/BackButton'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

function Report() {
  return (
    <View style={styles.container}>
      <BackButton/>
      <Text style={styles.header}>
        Report a {"\n"}Hazard
      </Text>
      <Text>
        Report Title
      </Text>
      <TextInput placeholder='Title' style={styles.input}/>
      <Text>
        Location
      </Text>
      <TextInput placeholder='Location' style={styles.input}/>
      <Text>
        Description
      </Text>
      <TextInput
        placeholder='Description'
        multiline={true}
        style={styles.inputDescription}
      />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit report</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default Report