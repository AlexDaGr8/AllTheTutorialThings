import { defineStore } from 'pinia';
import { ref, type ComputedRef, type Ref, computed } from 'vue';

export interface iPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface iPostState {
    posts: iPost[];
    post?: iPost;
    loading: boolean;
    error?: string;
}

export const usePostStore = defineStore('posts', () => {
    const posts: Ref<iPost[]> = ref([]);
    const post: Ref<iPost | undefined> = ref(undefined);
    const loading: Ref<boolean> = ref(false);
    const error: Ref<string | undefined> = ref(undefined);

    function getPostsPerAuthor(authorId: number) {
        return posts.value.filter(post => post.userId === authorId)
    }

    async function fetchPosts() {
        posts.value = [];
        loading.value = true;
        try {
            posts.value = await fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json());
        } catch (error: any) {
            error.value = error;
        } finally {
            loading.value = false;
        }
    }

    async function fetchPost(id: number) {
        post.value = undefined;
        loading.value = true;
        try {
            post.value = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
                .then(response => response.json());
        } catch (error: any) {
            error.value = error;
        } finally {
            loading.value = false;
        }
    }

    return { 
        posts, 
        post, 
        loading, 
        error, 
        getPostsPerAuthor,
        fetchPosts,
        fetchPost
    };
})