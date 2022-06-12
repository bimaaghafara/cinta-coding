import axios from 'axios';
import { useQuery } from 'react-query';

export const useGetUsers = (options = {}) => {
  const getUsers = async () => axios.get('https://jsonplaceholder.typicode.com/users')
  return useQuery(['getUsers'], getUsers, options);
};