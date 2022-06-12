import axios from 'axios';
import { useQuery, useQueries } from 'react-query';

export const useGetPosts = (options = {}) => {
  const getPosts = async () => axios.get('https://jsonplaceholder.typicode.com/posts')
  return useQuery(['getPosts'], getPosts, options);
};

export const useGetComments = (posts, options = {}) => {
  const getComments = async (postId) => axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return useQueries(
    (posts || []).map(post => {
      return {
        queryKey: ['getComment', post.id],
        queryFn: () => getComments(post.id),
        ...options
      }
    }),
  );
}

export const useGetUsers = (posts, options = {}) => {
  const getUsers = async (userId) => axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return useQueries(
    (posts || []).map(post => {
      return {
        queryKey: ['getUser', post.userId],
        queryFn: () => getUsers(post.userId),
        ...options
      }
    }),
  );
}