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

import sideBar from "./Screens/Navigation/Sidebar.vue";
import StartScreen from "./Start.vue";
import CreateAccountScreen from "./Screens/UserRegistration/CreateAccount.vue";
import LoginScreen from "./Screens/UserRegistration/Login.vue";
import HomeScreen from "./Screens/Home/Home.vue";
import ContactsScreen from "./Screens/DrawerScreen/Contacts.vue";
import SettingsScreen from "./Screens/DrawerScreen/Settings.vue";
import GetHelpScreen from "./Screens/DrawerScreen/GetHelp.vue";
import HousingScreen from "./Screens/Housing/Housing.vue";
import AddHousingScreen from "./Screens/Housing/AddHousing.vue";
import HousingListingScreen from "./Screens/Housing/HousingListing.vue";
import RideShareScreen from "./Screens/RideShare/RideShare.vue";
import RoomateScreen from "./Screens/Roomate/Roomate.vue";
import MessagesScreen from "./Screens/Communication/Messages.vue";
import RideShareListScreen from "./Screens/RideShare/RideShare-list.vue";
import RoommateScreen from "./Screens/Roomate/Roomate.vue";

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

// Ride Share stack
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
              source={require("./assets/png_icons/navbar/housing-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/png_icons/navbar/housing-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  Roomate: {
    screen: RoomateScreen,
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
              source={require("./assets/png_icons/navbar/roommates-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/png_icons/navbar/roommates-inactive.png")}
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
            width: 30,
            height: 30,
          },
        });
        if (focused) {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/png_icons/navbar/carpool-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/png_icons/navbar/carpool-inactive.png")}
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
              source={require("./assets/png_icons/navbar/notif-active.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/png_icons/navbar/notif-inactive.png")}
            />
          );
        }
      },
      tabBarOptions: {
        showLabel: false,
      },
    },
  },
  SideBarAccess: {
    screen: sideBar,
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
              source={require("./assets/png_icons/hamburger-nav.png")}
            />
          );
        } else {
          return (
            <Image
              style={styles.tinyLogo}
              source={require("./assets/png_icons/hamburger-nav.png")}
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

// Main drawer for the application
const MainDrawer = createDrawerNavigator(
  {
    Home: MainTabs,
    Contacts: ContactsScreen,
    Settings: SettingsScreen,
    "Get Help": GetHelpScreen,
    Logout: StartScreen,
  },
  {
    initialRouteName: "Logout",
    contentOptions: {
      activeTintColor: "orange",
      inactiveBackgroundColor: "#e91e63",
    },
    contentComponent: sideBar,
  }
);

// The main app with both navigation workflows
const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: MainDrawer,
  },
});

const AppNavigator = createAppContainer(App);

// const DrawerNavigator = createDrawerNavigator(
//     {
//         Home: HomeScreen,
//         Start: StartScreen,
//         Contacts: ContactsScreen,
//         Settings: SettingsScreen,
//         "Get Help": GetHelpScreen
//     },
//     {
//         initialRouteName: "Start"
//     }
// );

// const StackNavigator = createSwitchNavigator({
//     Drawer: DrawerNavigator,
//     Home: HomeScreen,
//     Housing: HousingScreen,
//     RideShare: RideShareScreen,
//     Roomate: RoomateScreen,
//     Messages: MessagesScreen,
//     "Create Account": CreateAccountScreen,
//     Login: LoginScreen,
// });

// const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
};
</script>
