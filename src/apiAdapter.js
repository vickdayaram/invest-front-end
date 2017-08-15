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

export const getTransactions = () => {
  return (fetch(`${baseUrl}/transactions`, {
    method: 'GET',
    headers: headers(),
  }).then(res => res.json()))
}

export const sendTransaction = (transaction) => {
  return (fetch(`${baseUrl}/transact`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(transaction)
  }).then(res => res.json()))
}

export const sendNewAccount = (newAccount) => {
  return (
    fetch(`${baseUrl}/newaccount`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(newAccount)
    }).then(res => res.json())
  )
}

export const fetchTotalAndAllocation = () => {
  return (fetch(`${baseUrl}/me`, {
    method: 'GET',
    headers: headers(),
  }).then(res => res.json()))
}

export const fetchAlphaVantage = (symbol) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=NKIEQH9ZHQ1ZFJVL`
  return (fetch(url)
  .then( res => res.json()))
}

export const fetchSectorPerformance = () => {
  let url = `https://www.alphavantage.co/query?function=SECTOR&apikey=NKIEQH9ZHQ1ZFJVL`
  return (fetch(url)
  .then( res => res.json()))
}

export const fetchStockPerformance = (symbol) => {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&interval=1min&outputsize=full&apikey=NKIEQH9ZHQ1ZFJVL`
  return (fetch(url)
  .then( res => res.json()))
}
