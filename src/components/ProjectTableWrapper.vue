<script setup>
import Icon from "@/components/Icon.vue";
</script>

<template>
  <div class="table-wrapper">
    <div class="table-header">
      <div class="table-cell">
        <div class="tableHeaderItemsContainer">
          <p class="firstProjectP">Project name</p>
          <div>
            <icon name="caretDown" class="tableItemsCaretDown"/>
          </div>
        </div>
      </div>
      <div class="table-cell wide projectTableDomainColumn">
        <div class="tableHeaderItemsContainer">
          <p>Subdomain name</p>
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
  background-color: pink;
  .table-header {
    background-color: lightgreen;
    display: flex;
    border-bottom: 2px solid $lightGrey;

    .table-cell {
      flex: 1;

      &.wide {
        flex: 2;
      }
    }

    .table-actions {
      width: 7rem;
    }
  }

  .tableHeaderItemsContainer {
    display: inline-flex;
    cursor: pointer;
    gap: 5px;
    align-items: center;
    white-space: nowrap;

    .firstProjectP {
      padding: 0.25rem 0.5rem 0.25rem 0;
    }

    p {
      padding: 0.25rem 0.5rem;
    }

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