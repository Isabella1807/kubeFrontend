<script setup>
import {RouterView} from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
  
  <div class="body_container">
    <Header></Header>
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
  display: flex;
  flex-direction: column;

  .main_container {
    flex: 1;
    display: flex;
    justify-content: space-around;

    main {
      max-width: min(1350px, calc(100% - 3rem));
      flex: 1;
      padding: 4rem 0;
    }
  }
}

@include largeScreenOrSmaller {

}
</style>