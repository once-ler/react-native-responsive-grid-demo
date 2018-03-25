import { Navigation } from 'react-native-navigation'
import Login from '../modules/Login/Login'
import HomeTab from '../modules/Home/HomeTab'
import SearchTab from '../modules/Home/SearchTab'
import BottomTabsSideMenu from '../modules/Home/BottomTabsSideMenu'

export default (store, Provider) =>  {
  Navigation.registerComponent('example.Login', () => Login, store, Provider)
  Navigation.registerComponent('example.HomeTab', () => HomeTab, store, Provider)
  Navigation.registerComponent('example.SearchTab', () => SearchTab, store, Provider)
  Navigation.registerComponent('example.BottomTabsSideMenu', () => BottomTabsSideMenu, store, Provider)
}
