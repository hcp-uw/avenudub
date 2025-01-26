import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

function BackButton() {
  const navigation = useNavigation();
  return (
    <Button title="Go Back" onPress={() => navigation.goBack()} />
  )
}

export default BackButton