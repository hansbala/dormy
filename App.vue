<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from "vue-native-router";

import StartScreen from "./Start.vue";
import HomeScreen from "./Screens/Home/Home.vue";

// Will need the switch navigator for the login flow 
// to essentially remove the "Back" button from different
// login screens. The login/signup navigator will 
// probably be wrapped inside the drawer and tabbed navigator

// const StackNavigator = createSwitchNavigator(
//   {
//     Start: StartScreen,
//     Home: HomeScreen,
//   },
//   {
//     initialRouteName: 'Start',
//   }
// );

const DrawerNavigator = createDrawerNavigator(
  {
    Start: StartScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Home'
  }
);

const StackNavigator = createSwitchNavigator(
  {
    Drawer: DrawerNavigator,
    Home: HomeScreen,
    Start: StartScreen,
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>