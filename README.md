# Dormy 

The Dormy app for iOS and Android. Written in Vue Native.

![Dormy App Image](https://user-images.githubusercontent.com/20383602/79877510-f2205a00-8409-11ea-9c20-688f5a7a99e6.jpg)

## Structure
The app is structured into different Vue components. In the terminology of Dormy, they are referred to as `Screen`(s).

The basic layout of the app is as follows:
```
App.vue -> Entry point
    Start.vue -> Login/Sign-up wrapper screen
                 (entered only if not signed in)
    Screens/  -> All additional screens are located here
        Home/Home.vue -> Homepage/Search Functionality
        Housing/Housing.vue -> Rent/Sub-lease locator
        Rideshare/RideShare.vue -> Self-explanatory
        Roomate/Roomate.vue -> Roomate matcher
        ** Components added must be added here **
    assets/   -> App assets like fonts and images must be added here
```

## Database Standard
`Firebase:` Mostly all of the codebase is just a front-end to the Firebase `noSQL` database. The plan is to have the following components linked to FireBase:
* User Registration and Login (probably should use [`OAuth2`](https://oauth.net/2/))
* Images
* Chats (1-on-1 chats seemed to be supported out-of-the-box by Firebase. TODO: Look into Sync issues)
* Ridesharing Document information

The FireBase database and all other communication for the app is done with the following Gmail address (try to keep this secure). This prevents any personal conflicts:
```
Email: 		dormyproject@gmail.com
Password: 	dormy@brown420
```

## Requirements
* Vue native CLI must be installed. Installation instructions here: [vue-native-cli](https://vue-native.io/docs/installation.html)
* Install `expo` with `npm install --global expo-cli`
* [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) for running the simulator to test the application.
* Double check the requirements in the `package.json` file. Running it with `npm install` while being `cd`'d in the directory should ideally work fine.

## Building 
* `iOS:` `cd` into the dormy repo and run `npm run ios` to run the iOS simulator. If you wish to change the default simulator, just select the new device from the simulator, quit the simulator, and run the `npm run ios` command again to run the application on the target device.
* `Android:` Yet has to be tested, but assuming you have the Android SDK on your system, all you would have to run is `npm run android`.

## Contribution 
* Please do keep your commits small with an informative message accompanying the commit.
* Whenever, implementing a new feature, please do split the `master` branch off into another branch (Ex: `search-functionality-home`. Then when fully tested, merge the branches, and commit. This will save the hassle of merge conflicts in some cases.
* For all files, mostly including the `.vue` files, I've been following the [Google HTML Style Guide](https://google.github.io/styleguide/htmlcssguide.html)
* To sum it in a nutshell, indent with 2 spaces, `JS` variables to be `camelCased`, 
and use the [`1TBS`](https://en.wikipedia.org/wiki/Indentation_style#Variant:_1TBS_(OTBS)) for function declarations.

## Side Note
Vue Native is still an in-alpha stages sort-of-thing project so if you have some issues, consult the [React Native Docs](https://reactnative.dev/docs/getting-started)
Most of the shit available in React Native, can directly be used in Vue Native provided you `npm install`'d the sub-library.


## TODO
* Login/Sign-up functionality
* App integration with Firebase
* Home screen
* Ride-sharing
* Roommate matching
* Navigation (Might have to nest SwitchNavigator inside TabNavigator and DrawerNavigator to match the mockup)
* Please upload all assets including icons, backdrops, and define useful variables in `variables.js` such as the required accent colors and shit like that.
* Figure out shit related to `blah@blah.edu` address verification. (What happens if we are using `OAuth2`?

