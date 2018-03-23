import { Navigation } from 'react-native-navigation'
import Login from './modules/Login/Login'
import HomeTab from './modules/Home/HomeTab'
import SearchTab from './modules/Home/SearchTab'

export default (store, Provider) =>  {
  Navigation.registerComponent('ReactNativeReduxExample.Login', () => Login, store, Provider);
  Navigation.registerComponent('ReactNativeReduxExample.HomeTab', () => HomeTab, store, Provider);
  Navigation.registerComponent('ReactNativeReduxExample.SearchTab', () => SearchTab, store, Provider);
}