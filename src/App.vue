<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  <div class="body_container">
    <Header/>
    <div class="main_container">
      <main>
        <RouterView/>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body_container {
  min-height: 100vh;
  background-color: deeppink;
  display: flex;
  flex-direction: column;

  .main_container {
    background-color: orange;
    flex: 1;
    display: flex;
    justify-content: space-around;

    main {
      max-width: min(1350px, 100%);
      background-color: green;
      flex: 1;
      padding: 4rem 0;
    }
  }
}
</style>