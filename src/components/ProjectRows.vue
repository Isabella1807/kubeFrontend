<script setup>
import {computed, ref} from "vue";
import IconButton from "@/components/IconButton.vue";
import Icon from "@/components/Icon.vue";

const props = defineProps({
  projectName: {
    type: String,
    required: true
  },
  subdomainName: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: true
  }
})

const isOnline = ref(true);

const statusText = computed(() => isOnline.value ? 'Online' : 'Offline');

const statusClass = computed(() => {
  return isOnline.value ? 'green' : 'red'
})

const statusIcon = computed(() => {
  return isOnline.value ? 'stopIcon' : 'playIcon'
})

const toggleServer = () => {
  if (isOnline.value) {
    console.log("stop server")
    return
  }
  console.log("start server")
};
</script>

<template>
  <div class="table-row">
    <div class="table-cell">
      <div class="projectNameContainer">
        <Icon name="caretDown" class="projectCaretDownIcon"/>
        <p class="projectName">{{ props.projectName }}</p>
      </div>
    </div>
    <div class="table-cell wide projectTableDomainColumn">
      <p>{{ props.subdomainName }}</p>
    </div>
    <div class="table-cell projectTableGroupColumn">
      <p>{{ props.groupName }}</p>
    </div>
    <div class="table-actions" :class="statusClass">
      <p>{{ statusText }}</p>
      <IconButton :icon="statusIcon" @click="toggleServer"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-row {
  background-color: cadetblue;
  display: flex;
  align-items: end;
  border-bottom: 2px solid $lightGrey;
  padding: 1rem 0 0.5rem 0;

  .table-cell {
    flex: 1;
    overflow: hidden;

    &.wide {
      flex: 2;
    }

    .projectNameContainer {
      display: flex;

      .projectCaretDownIcon {
        color: $primaryPurple;
      }

      .projectName {
        font-weight: $boldFont;
      }
    }

    p {
      padding: 0.25rem 0.5rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .table-actions {
    display: flex;
    align-items: end;
    justify-content: space-between;
    width: 6.5rem;

    &.green p {
      color: lightgreen;
    }

    &.red p {
      color: red;
    }
  }
}

@include mediumScreenOrSmaller {
  .table-row {
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

@include smallScreen {
  .table-row {
    .table-cell {
      &.projectTableDomainColumn {
        display: none;
      }
    }
  }
}
</style>