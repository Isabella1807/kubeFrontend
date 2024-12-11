<script setup>
import {computed, ref} from "vue";
import IconButton from "@/components/IconButton.vue";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import DeleteModal from '@/components/Modal_DeleteProject.vue';

const showModalDeleteModal = ref(false);
const projectName = "Example Project"; // Replace this with dynamic data if needed

const props = defineProps({
  projectData: {
    type: Object,
    required: true
  }
})

const isOnline = computed(() => props.projectData.state);

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

const projectCreatedDate = new Date(props.projectData.createdDate).toDateString()
const projectLastChangeDate = new Date(props.projectData.lastChangeDate).toDateString()

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
        <p>{{ props.projectData.teamName }}</p>
      </div>
      <div class="table-actions" :class="statusClass">
        <p>{{ statusText }}</p>
        <IconButton :icon="statusIcon" @click="toggleServer"/>
      </div>
    </div>

    <div class="projectAccordion" v-if="accordionToggle">
      <div class="projectAccordionText">
        <p><span class="accordionTitle">Owner:</span> {{ `${props.projectData.firstName} ${props.projectData.lastName}`}}</p>

        <p class="accordionResponsiveItems no1"><span class="accordionTitle">Subdomain name:</span>
          {{ props.projectData.subdomainName }}</p>
        <p class="accordionResponsiveItems no2"><span class="accordionTitle">Group name:</span>
          {{ props.projectData.teamName }}</p>

        <p><span class="accordionTitle">UCL mail:</span> {{ props.projectData.uclMail }}</p>
        <p><span class="accordionTitle">Created:</span> {{ projectCreatedDate }}</p>
        <p><span class="accordionTitle">Last change:</span> {{ projectLastChangeDate }}</p>
      </div>

      <div class="projectButtonsContainer">
        <Button icon="restart" text="Restart"/>
        <Button icon="trashcan" text="Delete project" danger @click="showModalDeleteModal = true"/>
        <DeleteModal v-if="showModalDeleteModal" :projectName="projectName" @close="showModalDeleteModal = false"/>
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
          font-weight: $font-weight;
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
        font-weight: $font-weight;
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
        font-weight: $font-weight;
      }

      .accordionResponsiveItems {
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

    .projectAccordion {
      .projectAccordionText {
        .accordionResponsiveItems.no2 {
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

    .projectAccordion {
      .projectAccordionText {
        .accordionResponsiveItems.no1 {
          display: block;
        }
      }
    }
  }
}
</style>