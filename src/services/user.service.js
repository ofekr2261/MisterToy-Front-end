import { httpService } from './http.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  query,
  getById,
  remove,
  update,
  getEmptyCredentials,
}

window.userService = userService

function query() {
  return httpService.get(`user`)
}

async function getById(userId) {
  const user = await httpService.get(`user/${userId}`)
  return user
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  await httpService.put(`user/${user._id}`, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return saveLocalUser(user)
  }
}

async function signup(userCred) {
  const user = await httpService.post('auth/signup', userCred)
  return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  console.log('user.isAdmin:', user.isAdmin)
  user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
    isAdmin: false,
  }
}
