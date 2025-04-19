import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen(props: { navigation: { navigate: (arg0: string) => void; }; }){
  return(
   /* <ImageBackground
      source={require("../assets/images/seattle-2084690_1920.jpg")} // Local image
      style={styles.background}
      resizeMode="cover"
    >
      */
    <View style = {styles.container}>
    <SafeAreaView style={styles.textBlock}>
      <Text style = {styles.text}>Welcome Back! Let's discover something new.</Text>
    </SafeAreaView>
      <View style = {styles.buttonContainer}>
      <TouchableOpacity
        //title="Go to Settings"
        style = {styles.button} 
        onPress={() => props.navigation.navigate('Settings')}
      >
        <Ionicons name="settings-outline" color="black" size={40}/>
      </TouchableOpacity>
      <TouchableOpacity
        //title="Go to Reports"
        onPress={() => props.navigation.navigate('Reports')}
        style = {styles.button}
      > 
       <Ionicons name="checkmark-circle-outline" color="black" size={40}/>
      </TouchableOpacity>
      </View>
    </View>
    //</ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#f2e8dc',
    flexDirection: 'column', // Align children horizontally
    justifyContent: 'space-around', // Evenly space buttons 
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
    padding: 20,
    borderRadius: 55,
    width: "50%",
    height: "25%",
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
    backgroundColor:'#f2e8dc',
  }
});
