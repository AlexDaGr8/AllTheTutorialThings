import { usePostStore } from './post';
import { defineStore, storeToRefs } from 'pinia';
import { ref, type ComputedRef, type Ref, computed } from 'vue';

export interface iComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export const useCommentStore = defineStore('comments', () => {
    const postStore = usePostStore();
    const { post } = storeToRefs(postStore);
    const comments: Ref<iComment[]> = ref([]);
    const postComments: ComputedRef<iComment[]> = computed(() => comments.value.filter(comment => comment.postId === post?.value?.id))

    async function fetchComments() {
        comments.value = await fetch('https://jsonplaceholder.typicode.com/comments')
            .then((response) => response.json())
    }

    function getCommentsByPostId(postId: number): iComment[] {
        return comments.value.filter(c => c.postId === postId);
    }

    return { comments, postComments, getCommentsByPostId, fetchComments };
})