<template>
  <Header />
  <Container />
</template>

<script>
import Header from "./components/Header.vue";
import Container from "./components/Container.vue";

export default {
  name: "App",
  components: {
    Header,
    Container,
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
}
body {
  margin: 0;
  padding: 0;
}
</style>
