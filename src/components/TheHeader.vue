<script setup>

</script>

<template>
  <div class="header_container">
    <header>
      Here goes the header
    </header>
  </div>
</template>

<style lang="scss" scoped>
.header_container {
  background-color: aqua;
  display: flex;
  justify-content: space-around;

  header {
    background-color: bisque;
    max-width: 1200px;
    flex: 1;
  }
}
</style>