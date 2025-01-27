import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from "../assets/colors"

function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
       <AntDesign name="left" size={30} color={colors.primary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 10,
    left: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
})
export default BackButton