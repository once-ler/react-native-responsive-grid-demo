import { Navigation } from 'react-native-navigation'
import Login from '../modules/Login/Login'
import HomeTab from '../modules/Home/HomeTab'
import SearchTab from '../modules/Home/SearchTab'
import FlatListTab from '../modules/Home/FlatListTab'
import BottomTabsSideMenu from '../modules/Home/BottomTabsSideMenu'
import SubView from '../modules/Home/SubView'
import UserProfile from '../modules/UserProfile/UserProfile'
import CaTableView from '../modules/CaPatient/CaTableView'
import CaPatientNameComponents from '../modules/CaPatient/CaPatientNameComponents'
import CaPatientDemographics from '../modules/CaPatient/CaPatientDemographics'
import AutoTagsTest from '../components/AutoTags/AutoTagsTest'
import CaPatientEthnicity from '../modules/CaPatient/CaPatientEthnicity'

export default (store, Provider) =>  {
  Navigation.registerComponent('example.Login', () => Login, store, Provider)
  Navigation.registerComponent('example.HomeTab', () => HomeTab, store, Provider)
  Navigation.registerComponent('example.SearchTab', () => SearchTab, store, Provider)
  Navigation.registerComponent('example.FlatListTab', () => FlatListTab, store, Provider)
  Navigation.registerComponent('example.BottomTabsSideMenu', () => BottomTabsSideMenu, store, Provider)
  Navigation.registerComponent('example.SubView', () => SubView, store, Provider)
  Navigation.registerComponent('example.UserProfile', () => UserProfile, store, Provider)
  Navigation.registerComponent('example.CaTableView', () => CaTableView, store, Provider)
  Navigation.registerComponent('example.CaPatientNameComponents', () => CaPatientNameComponents, store, Provider)
  Navigation.registerComponent('example.CaPatientDemographics', () => CaPatientDemographics, store, Provider)
  Navigation.registerComponent('example.AutoTagsTest', () => AutoTagsTest, store, Provider)
  Navigation.registerComponent('example.CaPatientEthnicity', () => CaPatientEthnicity, store, Provider)
}
