import BackButton from '@/components/BackButton'
import React, { useEffect } from 'react'
import {Text,Button,View, StyleSheet,ImageBackground,SafeAreaView,ScrollView,FlatList,Image,ImageSourcePropType, Platform, Alert} from "react-native";
import {ParamListBase, RouteProp, useNavigation} from '@react-navigation/native';
import { NavigationContainer } 
         from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Button } from '@react-navigation/elements';
import { TouchableOpacity, Linking} from 'react-native';
import Settings from "./settings";
import Report from "./report";
import Register from "./register" // REMOVE WHEN NAVIGATION IS FIGURED OUT
import adminlogin from "./adminlogin"; // REMOVE WHEN NAVIGATION IS FIGURED OUT
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComponent from "./searchbar"
//import FadeImage from '@/components/FadeImage';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
//           headerShown: false,
import RatingsComponent from "@/components/ratings";
import { geocodeAddress } from './maps'; // Import the geocodeAddress function

type BusinessInfoParams = {
   business:{
    id: string;
    name: string;
    distance: string;
    address: string;
    image: string;
    foodType: string;
    priceRange: string;
    discounts: [];
    hours: [string, string, string, string, string, string, string];
   }
};



  const openInMaps = async (latitude: number, longitude: number, label: string) => {
    const nativeURL = Platform.select({
      ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(label)}`,
      android: `geo:${latitude},${longitude}?q=${encodeURIComponent(label)}`,
    });
  
    const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&query_place_id=${encodeURIComponent(label)}`;

    try{
        if(nativeURL){
            const supported = await Linking.canOpenURL(nativeURL);
            if(supported){  
               await Linking.openURL(nativeURL);
               return;
        }
        const supportedFallback = await Linking.canOpenURL(fallbackUrl);
        if (supportedFallback) {
      await Linking.openURL(fallbackUrl);
    } else {
      Alert.alert("Unable to open map", "No map application or browser found.");
    }
  } 
    } catch (error) {
        console.error('Error opening maps:', error);
        Alert.alert("Error", "Something went wrong while opening the map.");
      }
  };

const BusinessesInfoScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const route = useRoute<RouteProp<{ BusinessesInfo: BusinessInfoParams }, 'BusinessesInfo'>>();
    const {business} = route.params;
    const {id, name, distance, address, image, foodType, priceRange, discounts} = business;
    
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const location = await geocodeAddress(business.address);
      if (location) {
        setCoords({ latitude: location.latitude, longitude: location.longitude });
      }
    };

    fetchCoordinates();
  }, [business.address]);
    return(
        <>
        <View style={styles.back}>
            <BackButton />
        </View>
        <View style={styles.container}>
            <ScrollView>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                        <Text style={styles.headers}>{name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.subtext}>Category:</Text>
                            <Text style={{fontSize: 20}}>{foodType}</Text>
                        </View>
                        {priceRange === "$" && (
                            <View style={styles.priceRange}>
                                <Text style={styles.subtext}>Price Range:</Text>
                                <Text style={styles.priceText}>$</Text>
                            </View>
                        )}
                        {priceRange === "$$" && (
                            <View style={styles.priceRange}>
                                <Text style={styles.subtext}>Price Range:</Text>
                                <Text style={styles.priceText}>$$</Text>
                            </View>
                        )}
                        {priceRange === "$$$" && (
                            <View style={styles.priceRange}>
                                <Text style={styles.text}>Price Range:</Text>
                                <Text style={styles.priceText}>$$$</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.addresses}>
                        <Text style={styles.address}>{address}</Text>
                        {coords && (
                        <TouchableOpacity style={styles.addressButton} 
                        onPress={() => openInMaps(coords.latitude, coords.longitude, business.name)}>
                            <Text style={styles.addressText}>
                                Take me there!
                            </Text>
                        </TouchableOpacity>
                        )}
                        <Text style={styles.subtext}>
                            Discounts Available:
                        </Text>
                        <FlatList
                                data = {discounts}
                                numColumns={1}
                                renderItem={({ item }) => (
                                  <Text>{item}</Text>
                                )}
                                keyExtractor={(item) => item}
                        />
                    </View>
                    <View style={styles.hoursContainer}>
                        <Text style={styles.headers}>Hours:</Text>
                        <FlatList
                            data = {business.hours}
                            numColumns={1}
                            renderItem={({item}) => (
                                <Text style={styles.text}>{item}</Text>
                            )}
                            keyExtractor={(item) => item}
                        />
                    </View>
                    <View>
                        <RatingsComponent/>
                    </View>
                    {coords && (
                        <View style={styles.mapContainer}>
                            <Text style={styles.subtext}>Location on Map:</Text>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                latitude: coords?.latitude || 0,
                                longitude: coords?.longitude || 0,
                                latitudeDelta: 0.02,
                                longitudeDelta: 0.02,
                                }}
                            >
                            {coords && (
                                <Marker coordinate={coords} title={business.name} description={business.address} />
                            )}
                            </MapView>
                            </View>)}
                </ScrollView>
            </View>
        
        </>
    )


}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#f2e8dc',
      flex: 1,
      padding: 30,
      alignItems: 'center',
      width: '100%',
      height:'100%',
    },
    image:{
        width:300,
        height:300,
        borderRadius:50,
        borderColor: 'black',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        alignItems: 'center',
        margin: 20,
    },
    imageContainer:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 50,
        margin: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoContainer:{
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 50,
        margin: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    headers:{
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    text:{
        fontSize: 20,
        alignItems: 'center',
    },
    priceRange:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',

    },
    categoryContainer:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        margin: 20,
    },
    priceText:{
        color:'#42f560',
        fontWeight:'bold',
        fontSize: 40,
    },
    back:{
        zIndex: 1,
    },
    addresses:{
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 50,
        margin: 20,
        flexDirection:'column',
        textAlign:'center',
        alignContent:'center',
        alignItems: 'center',

    },
    address:{
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    addressButton:{
        backgroundColor:"#5e30b3",
        borderRadius: 50,
        margin: 20,
        padding: 20,
        width: '50%',
        alignContent:'center',
    },
    addressText:{
        color:'white',
        fontSize:15,
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
    mapContainer: {
        height: 300,
        width: '100%',
        marginTop: 20,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 10,
      },
      
      map: {
        flex: 1,
      },
      hoursContainer:{
        backgroundColor:'white',
        padding: 40,
        borderRadius: 50,
        margin: 20,
        flexDirection:'column',
        textAlign:'center',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }

}
)

export default BusinessesInfoScreen;