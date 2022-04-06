// (Authentication service)

const axios = require('axios')
const API_URL = 'http://localhost:5050/auth/'

const register = (username, password) => {
    return axios.post(API_URL + 'register/', {
        username, password
    })
}

const login = (username, password) => {
    return axios.post(API_URL + 'login/', {username, password})
    .then((response) => {
        if(response.data.token) {
            console.log(response.data.token)
            //localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    })
}

const logout = () => {
    localStorage.removeItem('user')
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  };
  export default AuthService;