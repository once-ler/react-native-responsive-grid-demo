/* @flow */
import {Navigation} from 'react-native-navigation'
import createStore from '../../createStore'
import * as appActions from './AppAction' 

const {changeAppRoot, ROOT_LOGIN, ROOT_AFTER_LOGIN} = appActions
const persistedData = {}
const store = createStore(persistedData)

export default class App {
  constructor() {
    store.subscribe(this.onStoreUpdate.bind(this))
    store.dispatch(changeAppRoot(ROOT_LOGIN))
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
              screen: 'example.HomeTab',
              icon: require('./img/checkmark.png'),
              selectedIcon: require('./img/checkmark.png'),
              title: 'Hey',
              overrideBackPress: false,
              navigatorStyle: {}
            },
            {
              label: 'Search',
              screen: 'example.SearchTab',
              icon: require('./img/checkmark.png'),
              selectedIcon: require('./img/checkmark.png'),
              title: 'Hey',
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
