<template>
  <main id="app">
    <RouterView/>
  </main>
</template>

<script>

import {RouterView} from "vue-router";

export default {
  name: 'App',
  components:{RouterView}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  padding-block: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  background: #F5F5F5;
  color: #333333;
}
</style>
