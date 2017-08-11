const baseUrl = 'http://localhost:3000/api/v1'

const headers = () => {
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
    'Authorization': localStorage.getItem('jwt')
  }
}

export const getAccounts = () => {
  return (fetch(`${baseUrl}/getaccounts`, {
    method: 'GET',
    headers: headers(),
  }).then(res => res.json()))
}
