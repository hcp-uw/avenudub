import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import { useState, useEffect } from "react";
import { geocodeAddress } from "@/components/maps"; // Adjust the import path as needed
import React from "react";
import { themeStore } from "@/stores/theme-store";
import { observer } from "mobx-react-lite";
import { crimes, places } from "../routes";

const HomeScreen = observer((props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  // separate states bc im assuming we'd want to display them differently?
  const [crimeCoords, setCrimeCoords] = useState<{latitude: number; longitude: number }[]>([]);
  const [businessCoords, setBusinessCoords] = useState<{latitude: number; longitude: number }[]>([]);
  const { theme } = themeStore;
  // need coordinates for businesses and crimes
  useEffect(() => {
  const fetchCrimesAndCoords = async () => {
    try {
      const incidents = await crimes(1); // crime API call
      const businesses = await places(); // place API call

      if (!Array.isArray(incidents) || !Array.isArray(businesses)) return;

      // get coordinates from api result
      const locations_crime = await Promise.all(
        incidents.map((crime: { address: string }) =>
          geocodeAddress(crime.address)
        )
      );

      const locations_places = await Promise.all(
        businesses.map((place: { address: string}) =>
        geocodeAddress(place.address))
      )

      const validCrimeLocations = locations_crime.filter(
        (loc): loc is { latitude: number; longitude: number } => loc !== null
      );

      const validPlaceLocations = locations_places.filter(
        (loc): loc is { latitude: number; longitude: number } => loc !== null
      )

      setCrimeCoords(validCrimeLocations);
      setBusinessCoords(validPlaceLocations);
    } catch (err) {
      console.error(err);
    }
  };
    fetchCrimesAndCoords();
  }, []);


  return(
    <View style = {[styles.container, {backgroundColor: theme.background}]}>
    <SafeAreaView style={styles.textBlock}>
      <Text style = {styles.text}>Welcome Back!</Text>
    </SafeAreaView>
    <View style={styles.mapContainer}>
        <Text style={styles.subtext}>Here's what you've missed:</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude:  47.6564842,
                longitude: -122.3129439,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              >
                {crimeCoords.map((crimeCoords, index) => (
                  console.log(crimeCoords),
                  <Marker
                  key={index}
                  //coordinate={{latitude: coord.latitude, longitude: coord.longitude}}
                  coordinate={crimeCoords}
                  title={`Crime ${index + 1}`}
                  description={`Description of crime ${index + 1}`}
                  />
                  ))
                }
                {businessCoords.map((businessCoords, index) => (
                  console.log(businessCoords),
                  <Marker
                  key={index}
                  //coordinate={{latitude: coord.latitude, longitude: coord.longitude}}
                  coordinate={businessCoords}
                  title={`Businesss ${index + 1}`}
                  description={`Description of business ${index + 1}`}
                  />
                  ))
                }
            </MapView>
        </View>
      <View style = {styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Reports')}
        style = {styles.button}
      > 
       <Ionicons name="checkmark-circle-outline" color="black" size={40}/>
      </TouchableOpacity> */
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flexDirection: 'column', // Align children horizontally
    justifyContent: 'space-around', // Evenly space buttons 
    textAlign: 'center',
    //padding: 
    alignItems: 'center',
    flex:1,
  },
  button: {
    //backgroundColor: "#5529e2",
    backgroundColor: "white",
    alignItems: 'center',
    borderRadius: 55,
    justifyContent: 'space-around',
    flexDirection:'row',
    padding: 15,
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  background: {
    flex: 1, // Takes full screen
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text:{
    color:"black",
    fontSize:30,
    fontWeight:"bold",
    alignItems:"center",
    flexWrap: "wrap",
    padding: 10,
  },
  textBlock:{
    backgroundColor:"white",
    padding: 10,
    borderRadius: 55,
    width: "75%",
    height: "15%",
    margin: 20,
    //flexGrow:1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  buttonContainer:{
    flexDirection: 'row',
    margin: 10,
  },
  mapContainer:{
    width: "95%",
    height: "50%",
    borderRadius: 50,
    margin: 20,
    backgroundColor: "white",
  
  },
  subtext:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
},
map:{
  flex:1,
 }
});

export default HomeScreen;
