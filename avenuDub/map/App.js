import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiYW5hbnlhdCIsImEiOiJjbTY0MDdncG4wdXZrMm5vcXNibHFtcXJmIn0.0t8Dqo3Jf8xoc5PmPSyHOA');

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Map View:</Text>
      <Mapbox.MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default App;