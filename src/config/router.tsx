import React from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrphanagesMap from '../Pages/OrphanagesMap';
import OrphanageData from '../Pages/createOrphanage/OrphanageData';
import OrphanageDetails from '../Pages/OrphanageDetails';
import SelectMapPosition from '../Pages/createOrphanage/SelectMapPosition';
import Header from '../components/Header';

const { Navigator, Screen } = createStackNavigator()

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="orphanages" component={OrphanagesMap} />

        <Screen name="orphanageDetails" component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header title='Orfanato'
              showCancel={false} />
          }}
        />

        <Screen name="selectMapPosition" component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header title='Selecione a localização' />
          }}
        />

        <Screen name="orphanageData" component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header title='Informe os dados' />
          }}
        />


      </Navigator>
    </NavigationContainer>
  )
}