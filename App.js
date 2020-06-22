import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreMoviesScreen from './screens/ExploreMoviesScreen';
import MyMoviesScreen from './screens/MyMoviesScreen';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import DefaultHeader from './components/header';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createMaterialTopTabNavigator();

class App extends Component {


  render() {

    return (
      <>

        <DefaultHeader />
        <NavigationContainer >
          <Tab.Navigator
            tabBarPosition={"bottom"}
            initialRouteName="Explore"
            tabBarOptions={{
              activeTintColor: 'white',
              showLabel: false,
              labelStyle: { fontSize: 30, fontWeight: "bold" },
              style: { backgroundColor: 'black' },
              showIcon: true,
            }}
          >
            <Tab.Screen name="Explore" component={ExploreMoviesScreen} options={{
              tabBarIcon: () => (
                //Your icon component for example => 
                <Icon name="movie-filter" size={30} color="white" />
              )
            }}
            />
            <Tab.Screen name="My Movies" component={MyMoviesScreen} default options={{
              tabBarIcon: () => (
                //Your icon component for example => 
                <Icon name="local-movies" size={30} color="white" />
              )
            }} />
          </Tab.Navigator>
        </NavigationContainer >
        <FlashMessage position="top" />
      </>
    );
  }

}

export default App;