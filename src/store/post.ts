import { defineStore } from 'pinia';
import { ref } from 'vue';

import api from '@/api/index';

import { Post, PostList } from '@/types';

/**
 * Parses the list of posts from the API to have the format required in the application
 *
 * @param {array} posts - List of posts as they come from the API
 *
 * @returns {PostList} - List of the first five posts where every key is an id of the post
 */
const parseList = (posts: Post[]): PostList =>
  posts.slice(0, 5).reduce((sum, item) => ({ ...sum, [item.id]: item }), {});

export default defineStore('post', () => {
  const posts = ref<PostList>({});
  const error = ref(false);

  // Fetches the list of posts and sets it to the list state or sets an error if API call wasn't successful
  const fetchList = async () => {
    try {
      posts.value = parseList(await api.getList());
      error.value = false;
    } catch {
      error.value = true;
    }
  };

  return {
    posts,
    error,
    fetchList,
  };
});
