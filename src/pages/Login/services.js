import axios from 'axios';
import { useQuery } from 'react-query';

export const useUsersQuery = (options = {}) => {
  const getUsers = async () => axios.get('https://jsonplaceholder.typicode.com/users')
  return useQuery(['getUsers'], getUsers, options);
};