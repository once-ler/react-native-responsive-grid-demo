/* @flow */
import t from 'tcomb-form-native'
const { String, Boolean, Number, Date, maybe: Option, struct: Class, list: List } = t

export const Person = Class({
  username: String,
  email: String,
  name: String,
  surname: Option(String),
  age: Number,
  rememberMe: Boolean
})
