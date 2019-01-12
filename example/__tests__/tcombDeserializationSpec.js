import {CaPatient, CaPatientNameComponents} from '../../example/src/modules/CaPatient/CaPatientTypes'

const createCaPatient = () => CaPatient({
  id: 'mickeymouse',
  dateOfBirth: new Date('1928-11-18'),
  nameComponents: [
    CaPatientNameComponents({
      firstName: 'Mickey',
      lastName: 'Mouse'
    })
  ]   
})

const testTcombSerialization = () => {
  const patient = createCaPatient()

  console.log(patient)

  const j = JSON.stringify(patient, null, 2)

  console.log(j)
}

testTcombSerialization()
