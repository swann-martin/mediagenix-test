import axios from 'axios';

const api = 'http://localhost:5101';

export const fetchEvents = () =>
  axios.get(`${api}/events`).then((res) => res.data);

export const fetchFormSchema = () =>
  axios.get(`${api}/schema`).then((res) => res.data);

export const postEvent = (data: {}) =>
  axios.post(`${api}/events`, data).then((res) => res.data);
