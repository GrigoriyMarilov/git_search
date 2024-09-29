<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: "SpinnerComponent"
}
</script>

<style scoped>
.spinner {
  margin: 0 auto;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #42b983;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>