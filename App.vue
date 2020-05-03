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
import CreateAccountScreen from "./Screens/UserRegistration/CreateAccount.vue";
import LoginScreen from "./Screens/UserRegistration/Login.vue";
import HomeScreen from "./Screens/Home/Home.vue";
import ContactsScreen from "./Screens/DrawerScreen/Contacts.vue";
import SettingsScreen from "./Screens/DrawerScreen/Settings.vue";
import GetHelpScreen from "./Screens/DrawerScreen/GetHelp.vue";
import HousingScreen from "./Screens/Housing/Housing.vue";
import RideShareScreen from "./Screens/RideShare/RideShare.vue";
import RoomateScreen from "./Screens/Roomate/Roomate.vue";
import MessagesScreen from "./Screens/Communication/Messages.vue";

// Will need the switch navigator for the login flow
// to essentially remove the "Back" button from different
// login screens. The login/signup navigator will
// probably be wrapped inside the drawer and tabbed navigator

// Drawer naviagtor holds the profile information, get help settings
// The tab naviagtor holds the home/search, housing, ridesharing,
// messages, and other screens as deemed fit

const DrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        Start: StartScreen,
        Contacts: ContactsScreen,
        Settings: SettingsScreen,
        "Get Help": GetHelpScreen
    },
    {
        initialRouteName: "Start"
    }
);

const StackNavigator = createSwitchNavigator({
    Drawer: DrawerNavigator,
    Home: HomeScreen,
    Housing: HousingScreen,
    RideShare: RideShareScreen,
    Roomate: RoomateScreen,
    Messages: MessagesScreen,
    "Create Account": CreateAccountScreen,
    Login: LoginScreen,
});

const AppNavigator = createAppContainer(StackNavigator);

export default {
    components: { AppNavigator }
};
</script>
