<script setup>
import {computed, ref} from "vue";
import IconButton from "@/components/IconButton.vue";

const props = defineProps({
  projectName: {
    type: String,
    required: true
  },
  subdomainName: {
    type: String,
    required: true
  }
})

const isOnline = ref(false);

const statusText = computed(() => isOnline.value ? 'Online' : 'Offline');

const statusClass = computed(() => {
  return isOnline.value ? 'green' : 'red'
})
</script>

<template>
  <div class="table-row">
    <div class="table-cell">
      <p>{{ props.projectName }}</p>
    </div>
    <div class="table-cell wide">
      <p>{{ props.subdomainName }}</p>
    </div>
    <div class="table-cell">
      <p>Bla bla bla</p>
    </div>
    <div class="table-actions" :class="statusClass">
      <p>{{statusText}}</p>
      <IconButton icon="playIcon"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-row {
  background-color: orange;
  display: flex;

  .table-cell {
    flex: 1;

    &.wide {
      flex: 2;
    }
  }

  .table-actions {
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 6.5rem;

    &.green {
      color: lightgreen;
    }

    &.red {
      color: red;
    }
  }
}
</style>