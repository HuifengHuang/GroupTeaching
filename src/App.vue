<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HomeNew />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/indexOver.vue";
import HomeNew from "./components/indexNew.vue";

export default {
  name: "App",
  components: {
    Home,
    HelloWorld,
    HomeNew,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
