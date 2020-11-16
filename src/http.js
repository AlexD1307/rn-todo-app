export class Http {
  static HEADERS = {'Content-type': 'application/json'}

  static async get(url) {
    try {
      request(url, 'GET')
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static async post(url, data = {}) {
    try {
      return await request(url, 'POST', data)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static async patch(url, data = {}) {
    try {
      request(url, 'PATCH', data)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  static async delete(url) {
    try {
      request(url, 'DELETE')
    } catch (err) {
      console.log(err)
    }
  }
}

async function request(url, method = 'GET', data) {
  const config = {
    method,
    headers: Http.HEADERS
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(url, config)
  return await response.json()
}
