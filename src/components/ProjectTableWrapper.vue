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
      <div class="table-cell wide projectTableDomainColumn">
        <div class="tableHeaderItemsContainer">
          <p>Domain</p>
          <div>
            <icon name="caretDown" class="tableItemsCaretDown"/>
          </div>
        </div>
      </div>
      <div class="table-cell projectTableGroupColumn">
        <div class="tableHeaderItemsContainer ">
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
    <slot/> <!--    Rows ligger her-->
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  background-color: cornsilk;

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

@include mediumScreenOrSmaller {
  .table-wrapper {
    .table-header {
      .table-cell {
        &.wide {
          flex: 1;
        }

        &.projectTableGroupColumn {
          display: none;
        }
      }
    }
  }
}


@include smallScreen {
  .table-wrapper {
    .table-header {
      .table-cell {
        &.projectTableDomainColumn {
          display: none;
        }
      }
    }
  }
}
</style>