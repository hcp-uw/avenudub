import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from "../assets/colors"

function BackButton() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  container: {
    position: 'absolute',
    top: 45,
    left: 15,
  }
})
export default BackButton