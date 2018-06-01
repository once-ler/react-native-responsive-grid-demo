/* @flow */

const formValidation = (state) => {
  if (state.form.fields.username !== '' &&
        state.form.fields.email !== '' &&
        !state.form.fields.usernameHasError &&
        !state.form.fields.emailHasError &&
        (state.form.fields.username !== state.form.originalProfile.username ||
         state.form.fields.email !== state.form.originalProfile.email)
       ) {
    return state.setIn(['form', 'isValid'], true)
  } else {
    return state.setIn(['form', 'isValid'], false)
  }
}

export default formValidation
