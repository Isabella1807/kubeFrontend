<script setup>

import ProjectTableHeader from "@/components/ProjectTableHeader.vue";
import Icon from "@/components/Icon.vue";
</script>

<template>
  <div class="table-wrapper">
    <div class="table-header">
      <div class="table-cell">
        <p>Project</p>
      </div>
      <div class="table-cell wide">
        <p>Domain</p>
      </div>
      <div class="table-cell">
        <p>Group</p>
      </div>
      <div class="table-actions">
        <p>Status</p>
      </div>
    </div>
    <slot/> <!--    Rows ligger her-->
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  background-color: cornsilk;

  .table-header {
    background-color: orange;
    display: flex;

    .table-cell {
      flex: 1;

      &.wide {
        flex: 2;
      }
    }

    .table-actions {
      width: 6.5rem;
    }
  }
}
</style>