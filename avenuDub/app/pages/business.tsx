import BackButton from '@/components/BackButton'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

function Business() {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.header}>
        Business Catalog
      </Text>
      {/* Pass in an array for businesses */}
      {/* Figure out a way to space text out bc this is not gonna work when we actually implement 
      businesses lol */}
      {/* Placeholder text for now */}
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      <View style={styles.separator}/>
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      <View style={styles.separator}/>
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      <View style={styles.separator}/>
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      <View style={styles.separator}/>
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      <View style={styles.separator}/>
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      <View style={styles.separator}/>
      <Text style={styles.businessText}>[Company]                  [Distance]</Text>
      <Text style={styles.businessSubText}>[Address]</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    flex: 1,
    marginHorizontal: 0,
    padding: 30,
  },
  businessText: {
    paddingTop: 5,
    fontSize: 20
  },
  businessSubText: {
    paddingTop: 5,
    fontSize:15
  }
})

export default Business