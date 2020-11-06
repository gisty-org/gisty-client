<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <dialog open v-if="show">
      <section>
        <slot></slot>
      </section>
      <menu class="m-0 p-5 flex justify-center">
        <slot name="actions">
          
        </slot>
      </menu>
    </dialog>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  }
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 10;
}

dialog {
  position: fixed;
  z-index: 100;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  top: 7vh;
  width: 75%;
  background-color: transparent;
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 32rem);
  }
}

</style>