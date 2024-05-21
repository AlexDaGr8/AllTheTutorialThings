<template>
  <h1 class="banner">A Big Ole Title for YA</h1>

  <Teleport to="body">
    <PostModal @close="postStore.post = undefined" />
  </Teleport>
  <PostList :posts="posts" />
</template>

<script setup lang="ts">
import PostList from './components/PostList.vue';
import PostModal from './components/PostModal.vue';
import { storeToRefs } from 'pinia';
import { usePostStore } from './stores/post';
import useAuthorStore from './stores/author';
import { useCommentStore } from './stores/comment';
import { ref } from 'vue';

const postStore = usePostStore();
const { posts } = storeToRefs(postStore);
const { fetchPosts } = postStore;
const authorStore = useAuthorStore();
const { authors } = storeToRefs(authorStore);
const { fetchAuthors } = authorStore;
const commentStore = useCommentStore();
const { comments } = storeToRefs(commentStore);
const { fetchComments } = commentStore;

load();

async function load() {
  await fetchPosts();
  await fetchAuthors();
  await fetchComments();

  console.log('posts', posts.value);
  console.log('authors', authors.value);
  console.log('comments', comments.value);
}
</script>

