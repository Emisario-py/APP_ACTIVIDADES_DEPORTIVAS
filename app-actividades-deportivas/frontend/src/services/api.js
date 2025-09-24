import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://app-actividades-deportivas-vp5p-j5h3zf1n9.vercel.app/api',
  withCredentials: true
})
