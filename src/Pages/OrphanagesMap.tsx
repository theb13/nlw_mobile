import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/map-icon.png'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number,
  longitude: number,
  latitude: number,
  name: string
}


const OrphanagesMap = () => {

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages')
      .then(res => setOrphanages(res.data))
  });

  const navagations = useNavigation()

  function handleNavegateToOrphanageDetails(id: Number) {
    navagations.navigate('orphanageDetails', { id })
  }

  function handleNavegateToCreateOrphanage() {
    navagations.navigate('selectMapPosition')
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -25.9511575,
          longitude: 32.5888529,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        }}
      >
        {
          orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarker}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.7
                }}
              >
                <Callout tooltip onPress={() => handleNavegateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            )
          })
        }
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}> {orphanages.length} orfanatos encontrados</Text>
        <RectButton
          style={styles.createOrphanagesButton}
          onPress={handleNavegateToCreateOrphanage}
        >
          <Feather name='plus' size={20} color="#FFF" />
        </RectButton>
      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 30
  },
  calloutContainer: {
    width: 160,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: "center",
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
  },
  createOrphanagesButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center"
  },
});


export default OrphanagesMap