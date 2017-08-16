const localhost = 'http://localhost:3000/api/v1'
const herokuUrl = 'https://hidden-sea-22172.herokuapp.com/api/v1'
const baseUrl = herokuUrl

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signUp (signUpParams) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signUpParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}/me`, {
      headers: headers()
    }).then(res => res.json())
  }
}

function headers () {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}
