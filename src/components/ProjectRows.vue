<script setup>
import {computed, ref} from "vue";
import IconButton from "@/components/IconButton.vue";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";

const props = defineProps({
  projectData: {
    type: Object,
    required: true
  }
})

const isOnline = computed(() => props.projectData.status);

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

let accordionToggle = ref(false);

const toggleAccordion = () => {
  accordionToggle.value = !accordionToggle.value;
}
</script>

<template>
  <div class="table-row">
    <div class="tableRowItemsContainer">
      <div class="table-cell">
        <div class="projectNameContainer" @click="toggleAccordion">
          <Icon name="caretDown" class="projectCaretDownIcon"/>
          <p class="projectName">{{ props.projectData.projectName }}</p>
        </div>
      </div>
      <div class="table-cell wide projectTableDomainColumn">
        <p>{{ props.projectData.subdomainName }}</p>
      </div>
      <div class="table-cell projectTableGroupColumn">
        <p>{{ props.projectData.groupName }}</p>
      </div>
      <div class="table-actions" :class="statusClass">
        <p>{{ statusText }}</p>
        <IconButton :icon="statusIcon" @click="toggleServer"/>
      </div>
    </div>
    <div class="projectAccordion" v-if="accordionToggle">
      <div class="projectAccordionText">
        <p><span class="accordionTitle">Owner:</span> {{ props.projectData.owner }}</p>

        <p class="accordionResponsiveItems no1"><span class="accordionTitle">Subdomain name:</span> {{ props.projectData.subdomainName }}</p>
        <p class="accordionResponsiveItems no2"><span class="accordionTitle">Group name:</span> {{ props.projectData.groupName}}</p>

        <p><span class="accordionTitle">UCL mail:</span> {{ props.projectData.mail }}</p>
        <p><span class="accordionTitle">Created:</span> {{ props.projectData.createdAt }}</p>
        <p><span class="accordionTitle">Last change:</span> {{ props.projectData.lastChange }}</p>
      </div>
      <div class="projectButtonsContainer">
        <Button icon="restart" text="Restart"/>
        <Button icon="trashcan" text="Delete project" danger/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.table-row {
  border-bottom: 2px solid $lightGrey;

  .tableRowItemsContainer {
    display: flex;
    align-items: end;
    padding: 1rem 0 0.5rem 0;

    .table-cell {
      flex: 1;
      overflow: hidden;

      &.wide {
        flex: 2;
      }

      .projectNameContainer {
        display: inline-flex;
        cursor: pointer;

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
      width: 7rem;

      p {
        padding: 0.25rem 0.5rem;
        font-weight: 700;
      }

      &.green p {
        color: $online;

      }

      &.red p {
        color: $dangerRed;
      }
    }
  }

  .projectAccordion {
    padding-left: 32px;

    .projectAccordionText {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .accordionTitle {
        font-weight: 700;
      }
      .accordionResponsiveItems{
        display: none;
      }
    }

    .projectButtonsContainer {
      padding: 20px 0;
      display: flex;
      gap: 20px;
    }
  }
}

@include mediumScreenOrSmaller {
  .table-row {
    .tableRowItemsContainer {
      .table-cell {
        &.wide {
          flex: 1;
        }

        &.projectTableGroupColumn {
          display: none;
        }
      }
    }
    .projectAccordion{
      .projectAccordionText{
        .accordionResponsiveItems.no2{
          display: block;
        }
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
    .projectAccordion{
      .projectAccordionText{
        .accordionResponsiveItems.no1{
          display: block;
        }
      }
    }
  }
}
</style>