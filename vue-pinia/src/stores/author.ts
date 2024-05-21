import { usePostStore } from './post';
import { defineStore, storeToRefs, type Store, type _UnwrapAll } from 'pinia';
import { ref, type Ref, computed, type ComputedRef } from 'vue';

export interface iAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    }
}

export interface iCompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface iAuthor {
    id: number;
    name: string;
    username: string;
    email: string;
    address: iAddress,
    phone: string,
    website: string,
    company: iCompany
}

export interface AuthorStoreState { 
  authors: Ref<iAuthor[]>;
}

export interface AuthorStoreGetters { 
  postAuthor: ComputedRef<iAuthor | undefined>;
  getAuthorById: (id: number) => iAuthor;
}

export interface AuthorStoreActions {
  fetchAuthors: () => void;
}

export type UseAuthorStoreType = Store<
  'author',
  _UnwrapAll<Pick<AuthorStoreState, keyof AuthorStoreState>>,
  AuthorStoreGetters,
  AuthorStoreActions
>;

export default defineStore('author', () => {
  const postStore = usePostStore();
  const { post } = storeToRefs(postStore);
  const authors = ref([]);
  const postAuthor = computed(() => authors.value.find((author: iAuthor) => author.id === post?.value?.userId));

  function getAuthorById(id: number): iAuthor | undefined {
    return authors.value.find((author: iAuthor) => author.id === id);
  }

  async function fetchAuthors() {
    authors.value = await fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
  }

  return { authors, postAuthor, getAuthorById, fetchAuthors }

})