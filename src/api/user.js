import axios from '@/utils/axios'

export const getUserList = _ => {
  return axios.get('/user').catch(res => res.data)
}

export const addUser = form => {
  return axios.post('/user', form).catch(res => res.data)
}
