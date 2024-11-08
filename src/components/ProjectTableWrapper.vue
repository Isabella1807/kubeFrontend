<script setup>

import ProjectTableHeader from "@/components/ProjectTableHeader.vue";
import Icon from "@/components/Icon.vue";
</script>

<template>
  <div class="table-wrapper">
    <div class="table-header">
      <div class="table-cell">
        <div class="tableHeaderItemsContainer">
          <p>Project</p>
          <div>
            <icon name="caretDown" class="tableItemsCaretDown"/>
          </div>
        </div>
      </div>
      <div class="table-cell wide">
        <div class="tableHeaderItemsContainer projectSubdomainColumn">
          <p>Subdomain name</p>
          <div>
            <icon name="caretDown" class="tableItemsCaretDown"/>
          </div>
        </div>
      </div>
      <div class="table-cell projectGroupColumn">
        <div class="tableHeaderItemsContainer">
          <p>Group</p>
          <div>
            <icon name="caretDown" class="tableItemsCaretDown"/>
          </div>
        </div>
      </div>
      <div class="table-actions">
        <div class="tableHeaderItemsContainer">
          <p>Status</p>
          <div>
            <icon name="caretDown" class="tableItemsCaretDown"/>
          </div>
        </div>
      </div>
    </div>
    <slot/> <!--Rows ligger her-->
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  background-color: cornsilk;
  width: 100%;
  overflow: hidden;

  .table-header {
    background-color: dodgerblue;
    display: flex;
    border-bottom: 2px solid $lightGrey;

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

  .tableHeaderItemsContainer {
    display: inline-flex;
    cursor: pointer;
    gap: 10px;
    align-items: center;

    .tableItemsCaretDown {
      color: $primaryPurple;
    }
  }
}

@include smallScreen {
  .table-wrapper {
    .table-header {
      .projectGroupColumn {
        display: none;
      }

      .projectSubdomainColumn {
        display: none;
      }
    }
  }
}

@include mediumScreen {
  .table-wrapper {
    .table-header {
      .projectGroupColumn {
        display: none;
      }
    }
  }
}

</style>