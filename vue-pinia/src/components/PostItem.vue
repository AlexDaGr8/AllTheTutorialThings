<template>
    <div class="card" @click="setPost()">
        <h3 class="title">{{ post.title }}</h3>
        <div class="body">{{ post.body }}</div>
        <div class="author">{{ author ? '- ' + author.name : '' }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { usePostStore, type iPost } from '../stores/post';
import useAuthorStore, { type iAuthor } from '../stores/author';

const { post } = defineProps<{ post: iPost }>();
const postStore = usePostStore();
const authorStore = useAuthorStore();
const { getAuthorById } = authorStore;
const author: ComputedRef<iAuthor | undefined> = computed(() => getAuthorById(post.userId));

function setPost() {
    postStore.post = post;
}
</script>