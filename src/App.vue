<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <div class="body_container">
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
      max-width: 1350px;
      background-color: green;
      flex: 1;
      padding: 16px 24px;
    }
  }
}
</style>
