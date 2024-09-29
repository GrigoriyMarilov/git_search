<template>
  <button
      :class="buttonClass"
      :disabled="disabled"
      @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    buttonClass() {
      return {
        'button--primary': this.primary && !this.secondary,
        'button--secondary': this.secondary,
        'button--disabled': this.disabled,
      };
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  }
};
</script>

<style>
button {
  padding: 1rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  background: #42B983;
  color: #FFFFFF;
  fill: #FFFFFF;

  transition: all ease 200ms;

  cursor: pointer;
}

button:hover {
  background: #4a7964;
  color: #ffffff;
  fill: #ffffff;
}
</style>