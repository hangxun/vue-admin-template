import axios from '@/utils/axios'

export const getRoutes = _ => {
  return axios.get('/routes/routes').then(res => res.data)
}

export const addRoute = form => {
  return axios.post('/routes/routes', form).then(res => res.data)
}

export const delRotue = id => {
  return axios.delete(`/routes/routes/${id}`).then(res => res.data)
}

export const getRoute = id => {
  return axios.get(`/routes/routes/${id}`).then(res => res.data)
}

export const editRoute = ({ id, form }) => {
  return axios.put(`/routes/routes/${id}`, form).then(res => res.data)
}
