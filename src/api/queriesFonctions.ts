import axios, { AxiosResponse } from 'axios';
import { DataType } from '../utils/types';

export const api = 'http://localhost:5101';

export const fetchEvents = () =>
  axios
    .get(`${api}/events`)
    .then((res: AxiosResponse<DataType[]>) => res.data)
    .catch((err) => []);

export const fetchEventsFilter = async (filter: any) => {
  const data = await axios.get(`${api}/events?title=${filter}`);
  return data;
};
export const postEvent = (data: {}) =>
  axios.post(`${api}/events`, data).then((res) => res.data);

export const deleteEvent = (id: string) =>
  axios.delete(`${api}/events/${id}`).then((res) => res.data);

export const fetchFormSchema = () =>
  axios.get(`${api}/schema`).then((res) => res.data);
