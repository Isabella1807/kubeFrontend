<script setup>
const props = defineProps({
  projectName: {
    type: String,
    required: true
  }
})
</script>

<template>
<div>
  <h1>ROWS {{props.projectName}}</h1>
</div>
</template>

<style scoped lang="scss">

</style>