class ApiService {

    _apiBase = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        return await res.json()
    }

    getAllTasks() {
        return this.getResource('/?developer=RuslanAndreev')
    }

    async login(userName, password) {
        const res = await fetch(`${this._apiBase}/login?developer=RuslanAndreev&username=${userName}&password=${password}`)

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        return await res.json()
    }
}

export default ApiService