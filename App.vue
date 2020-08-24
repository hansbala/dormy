<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import React from "react";
import { Image, StyleSheet } from "react-native";

import Vue from "vue-native-core";
import { VueNativeBase, Icon } from "native-base";
Vue.use(VueNativeBase);


import StartScreen from "./Start.vue";
import CreateAccountScreen from "./Screens/UserRegistration/CreateAccount.vue";
import LoginScreen from "./Screens/UserRegistration/Login.vue";
import HomeScreen from "./Screens/Home/Home.vue";
import HousingScreen from "./Screens/Housing/Housing.vue";
import AddHousingScreen from "./Screens/Housing/AddHousing.vue";
import HousingListingScreen from "./Screens/Housing/HousingListing.vue";
import RideShareScreen from "./Screens/RideShare/RideShare.vue";
import MessagesScreen from "./Screens/Communication/Messages.vue";
import RideShareListScreen from "./Screens/RideShare/RideShare-list.vue";
import RoommateScreen from "./Screens/Roomate/Roomate.vue";
import RoommateCardExpanded from "./Screens/Roomate/RoommateCardExpanded.vue";
import MenuScreen from "./Screens/Navigation/Menu.vue";
import PersonalInfoScreen from "./Screens/DrawerScreen/PersonalInfo.vue";
import SettingsScreen from "./Screens/DrawerScreen/Settings.vue";
import GetHelpScreen from "./Screens/DrawerScreen/GetHelp.vue";

// Will need the switch navigator for the login flow
// to essentially remove the "Back" button from different
// login screens. The login/signup navigator will
// probably be wrapped inside the drawer and tabbed navigator

// Drawer naviagtor holds the profile information, get help settings
// The tab naviagtor holds the home/search, housing, ridesharing,
// messages, and other screens as deemed fit

// Auth stack which switches between login, create account, and landing page
const AuthStack = createStackNavigator({
  Landing: {
    screen: StartScreen,
    navigationOptions: {
      headerTitle: "Dormy!",
    },
  },
  "Create Account": {
    screen: CreateAccountScreen,
    navigationOptions: {
      headerTitle: "Create Account",
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: "Sign In",
    },
  },
});
// Housing Stack
const HousingNavigatorStack = createStackNavigator({
  HomeFeed: {
    screen: HousingScreen,
    navigationOptions: {
      title: "Home Feed",
      header: null,
    },
  },
  AddHousing: {
    screen: AddHousingScreen,
    navigationOptions: {
      title: "Add a listing!",
      header: null,
    },
  },
  HousingListing: {
    screen: HousingListingScreen,
    navigationOptions: {
      title: "Housing Listing",
    },
  },
});

// Rideshare stack
const RideShareNavigatorStack = createStackNavigator({
  FindRideShare: {
    screen: RideShareScreen,
    navigationOptions: {
      title: "RideShare",
      header: null,
    },
  },
  MakeRideShare: {
    screen: RideShareListScreen,
    navigationOptions: {
      title: "Schedule a Rideshare",
      header: null,
    },
  },
});

// Roommate Stack
const RoommateNavigatorStack = createStackNavigator({
  Roommate: {
    screen: RoommateScreen,
    navigationOptions: {
      title: "Browse",
      header: null,
    },
  },
  RoommateCardExpanded: {
    screen: RoommateCardExpanded,
    navigationOptions: {
      title: "Individual Card",
    },
  },
});

// Menu stack
const MenuNavigatorStack = createStackNavigator({
  Menu: {
    screen: MenuScreen,
    navigationOptions: {
      title: "Menu",
      header: null,
    },
  },
  "Personal Information": {
    screen: PersonalInfoScreen,
    navigationOptions: {
      title: null,
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      title: null,
    },
  },
  'Get Help': {
    screen: GetHelpScreen,
    navigationOptions: {
      title: null,
    },
  },
});

// Main application tabs
const MainTabs = createBottomTabNavigator({
  Housing: {
    screen: HousingNavigatorStack,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        const styles = StyleSheet.create({
          tinyLogo: {
            width: 30,
            height: 30,
          },
        });
        if (focused) {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/housing-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/housing-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  Roommate: {
    screen: RoommateNavigatorStack,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        const styles = StyleSheet.create({
          tinyLogo: {
            width: 30,
            height: 30,
          },
        });
        if (focused) {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/roomie-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/roomie-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  RideShare: {
    screen: RideShareNavigatorStack,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        const styles = StyleSheet.create({
          tinyLogo: {
            width: 27,
            height: 27,
          },
        });
        if (focused) {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/carpool-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/carpool-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  Messages: {
    screen: MessagesScreen,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        const styles = StyleSheet.create({
          tinyLogo: {
            width: 30,
            height: 30,
          },
        });
        if (focused) {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/bell-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/bell-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  Menu: {
    screen: MenuNavigatorStack,
    navigationOptions: {
      tabBarIcon: ({ focused, color, size }) => {
        const styles = StyleSheet.create({
          tinyLogo: {
            width: 30,
            height: 30,
          },
        });
        if (focused) {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/menu-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/iconsv2/menu-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
});

// The main app with both navigation workflows
const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: MainTabs,
  },
});

const AppNavigator = createAppContainer(App);

export default {
  components: { AppNavigator },
};
</script>
