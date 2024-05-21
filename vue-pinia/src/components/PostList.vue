<template>
    <div class="deck">
        <PostItem v-for="post in posts" :post="post" />
    </div>
</template>

<script setup lang="ts">
import PostItem from './PostItem.vue';
import type { iPost } from '@/stores/post';

interface Props {
    posts: iPost[];
}

const { posts } = defineProps<Props>();
</script>