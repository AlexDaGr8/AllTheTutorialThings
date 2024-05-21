<template>
  <Transition name="modal">
    <div v-if="post !== undefined" class="modal-mask">
      <div class="modal-container">
        <div class="modal-dismiss">
            <button
              class="modal-default-button"
              @click="$emit('close')"
            >X</button>
        </div>
        <div class="modal-header">
          <slot name="header"><h3>{{ post.title }}</h3></slot>
        </div>

        <div class="modal-body">
          <slot name="body">{{ post.body }}</slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            - {{ postAuthor !== undefined ? postAuthor.name : 'no author found' }}
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useAuthorStore from '../stores/author';
import { usePostStore } from '../stores/post';

const postStore = usePostStore();
const { post } = storeToRefs(postStore);
const authorStore = useAuthorStore();
const { postAuthor } = storeToRefs(authorStore)
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
    width: 60vw;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--color-background-mute);
  border-radius: 2px;
  box-shadow: 0 2px 8px var(--color-border);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: var(--color-heading);
  text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  text-align: right;
}

.modal-dismiss {
    text-align: right;
}

.modal-dismiss button {
    background: none;
	color: var(--vt-c-red-soft);
	border: solid 1px var(--vt-c-red-soft);
    border-radius: 10px;
	padding: .3rem .75rem;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    transition: .3s ease all;
}

.modal-dismiss button:hover {
    transform: rotate(180deg);
}

.modal-dismiss button:active {
    transform: scale(1.5) rotate(180deg);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>