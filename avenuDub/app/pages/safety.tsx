import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

function Safety() {
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.header}>
      Crime {"\n"}Catalog
      </Text>
      {/* Pass in an array for crime */}
      {/* Figure out a way to space text out bc this is not gonna work when we actually implement 
      crimes lol */}
      {/* Placeholder text for now */}
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
      <Text style={styles.crimeText}>[Crime]                                    [Distance]</Text>
      <View style={styles.separator}/>
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
  crimeText: {
    paddingTop: 5,
    fontSize: 20
  },
})
export default Safety