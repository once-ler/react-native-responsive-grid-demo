/* @flow */
import {Navigation} from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import {Provider} from 'react-redux'
import createStore from '../../createStore'
import * as appActions from './AppAction'
import registerScreens from '../../screens'

const {changeAppRoot, saveIcons, ROOT_LOGIN, ROOT_AFTER_LOGIN} = appActions
const persistedData = {}
const store = createStore(persistedData)

// screen related book keeping
registerScreens(store, Provider)

let settingsIcon;
let settingsOutlineIcon;
let peopleIcon;
let iosNavigateOutline;
let iosNavigate;

const populateIcons = () => 
  new Promise(function (resolve, reject) {
    Promise.all(
      [
        Icon.getImageSource('ios-settings', 30),
        Icon.getImageSource('ios-settings-outline', 30),
        Icon.getImageSource('ios-people', 30),
        Icon.getImageSource('ios-navigate-outline', 30),
        Icon.getImageSource('ios-navigate', 30)
      ]
    ).then((values) => {
      settingsIcon = values[0];
      settingsOutlineIcon = values[1];
      peopleIcon = values[2];
      iosNavigateOutline = values[3];
      iosNavigate = values[4];
      resolve(true);
    }).catch((error) => {
      console.log(error);
      reject(error);
    }).done();
  })

export default class App {
  constructor() {
    populateIcons().then(() => {
      // Start app only if all icons are loaded
      store.subscribe(this.onStoreUpdate.bind(this))
      store.dispatch(changeAppRoot(ROOT_LOGIN))
      store.dispatch(saveIcons({settingsIcon}))
    }).catch((error) => {
      console.error(error);
    })
  }

  onStoreUpdate() {
    const {root} = store.getState().app;
    
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root
      this.startApp(root)
    }
  }

  startApp(root) {
    switch (root) {
      case ROOT_LOGIN:
      console.log(ROOT_LOGIN)
        return Navigation.startSingleScreenApp({
          screen: {
            screen: 'example.Login', // unique ID registered with Navigation.registerScreen
            title: 'Welcome', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
          },
        })
      case ROOT_AFTER_LOGIN:
        return Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Home',
              screen: 'example.CaTableView',
              icon: require('../../img/checkmark.png'),
              selectedIcon: require('../../img/checkmark.png'),
              title: 'Hey',
              overrideBackPress: false,
              navigatorStyle: {}
            },
            {
              label: 'Test',
              screen: 'example.AutoTagsTest',
              icon: require('../../img/checkmark.png'),
              selectedIcon: require('../../img/checkmark.png'),
              title: 'Hey',
              navigatorStyle: {}
            },
            {
              label: 'FlatList',
              screen: 'example.FlatListTab',
              icon: settingsOutlineIcon,
              selectedIcon: settingsIcon,
              title: 'Long List',
              overrideBackPress: false,
              navigatorStyle: {}
            }
          ],
          animationType: 'slide-down',
          title: 'Redux Example',
          drawer: { // optional, add this if you want a side menu drawer in your app
            left: { // optional, define if you want a drawer from the left
              screen: 'example.BottomTabsSideMenu' // unique ID registered with Navigation.registerScreen
            },
            disableOpenGesture: false, // optional, can the drawer be opened with a swipe instead of button
            passProps: {
              title: 'Hello from SideMenu'
            }
          },
          appStyle: {
            bottomTabBadgeTextColor: '#ffffff',
            bottomTabBadgeBackgroundColor: '#ff0000'
          }
        })
      default:
        return console.error('No idea why you\'re here')
    }
  }
}
