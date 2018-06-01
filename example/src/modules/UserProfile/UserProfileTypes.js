/* @flow */
import t from 'tcomb-form-native'
const { String, Boolean, Number, Date, maybe: Option, struct: Class, enums: Enums, list: List } = t

const AccountType = Enums.of([
  'type 1',
  'type 2',
  'other'
], 'AccountType')

const KnownAccount = Class({
  type: AccountType
}, 'KnownAccount')

const Address = Class({
  street: String,
  city: String,
  state: String,
  postalCode: String
})

export const Person = Class({
  addresses: List(Address),
  accounts: List(KnownAccount),
  username: String,
  email: String,
  name: Option(String),
  surname: Option(String),
  age: Option(Number),
  rememberMe: Boolean
})
