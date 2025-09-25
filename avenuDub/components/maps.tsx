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
import UserContext from "@/components/user-context";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBarComponent from "./searchbar"
//import FadeImage from '@/components/FadeImage';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
//           headerShown: false,


const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key

export const geocodeAddress = async (address: string) => {
    console.log(address);
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        console.warn('Geocoding failed:', data.status);
        return null;
      }
    } catch (error) {
      console.error('Error during geocoding:', error);
      return null;
    }
  };