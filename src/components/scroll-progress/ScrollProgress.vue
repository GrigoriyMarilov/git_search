<template>
  <div class="progress-bar" :style="{ width: progress + '%' }"></div>
</template>

<script>
export default {
  name: "ScrollProgress",
  data() {
    return {
      progress: 0,
      throttledUpdateProgress: null,
    };
  },
  created() {
    this.throttledUpdateProgress = this.throttle(this.updateProgress, 200);
  },
  mounted() {
    window.addEventListener("scroll", this.throttledUpdateProgress);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.throttledUpdateProgress);
  },
  methods: {
    updateProgress() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      this.progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    },

    throttle(func, limit) {
      let lastFunc;
      let lastRan;

      return function () {
        const context = this;
        const args = arguments;

        if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      };
    },
  },
};
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 5px;
  background-color: #42b983;
  transition: width 0.2s ease;
}
</style>
