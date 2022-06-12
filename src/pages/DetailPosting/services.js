import axios from 'axios';
import { useQuery, useQueries } from 'react-query';

export const usePostQuery = (postId, options = {}) => {
  const getPosts = async () => axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  return useQuery(['getPosts', postId], getPosts, options);
};

export const useCommentsQuery = (postId, options = {}) => {
  const getComments = async () => axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return useQuery(['getComments', postId], getComments, options);
}

export const useUserQuery = (userId, options = {}) => {
  const getUser = async () => axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return useQuery(['getUser', userId], getUser, options);
}
