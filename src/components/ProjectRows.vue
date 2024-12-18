<script setup>
import {computed, ref, defineEmits} from "vue";
import IconButton from "@/components/IconButton.vue";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import DeleteModal from '@/components/Modal_DeleteProject.vue';
import ApiService from "@/services/apiService.js";

const showModalDeleteModal = ref(false);

const props = defineProps({
  projectData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['projectDeleted', 'projectStatus'])


const isOnline = computed(() => props.projectData.state);
const statusText = computed(() => isOnline.value ? 'Online' : 'Offline');

const statusClass = computed(() => {
  return isOnline.value ? 'green' : 'red'
})

const statusIcon = computed(() => {
  return isOnline.value ? 'stopIcon' : 'playIcon'
})

const toggleServer = async () => {
  if (isOnline.value) {
    // Stop server
    const stopResponse = await ApiService.post(`/projects/stop/${props.projectData.projectId}`);
    emit('projectStatus', props.projectData.projectId, 0)
    return
  }
  // Start server
  const startResponse = await ApiService.post(`/projects/start/${props.projectData.projectId}`);
  emit('projectStatus', props.projectData.projectId, 1)
};

const restartProject = async () => {
  /*if (!isOnline.value) {
    await ApiService.post(`/projects/start/${props.projectData.projectId}`);
  }*/
  emit('projectStatus', props.projectData.projectId, 0)
  // Restart server
  await ApiService.post(`/projects/restart/${props.projectData.projectId}`);

  emit('projectStatus', props.projectData.projectId, 1)
}

let accordionToggle = ref(false);

const toggleAccordion = () => {
  accordionToggle.value = !accordionToggle.value;
}

const projectCreatedDate = new Date(props.projectData.createdDate).toDateString();
const projectLastChangeDate = new Date(props.projectData.lastChangeDate).toDateString();

const deleteProject = async () => {
  try {
    const projectDelete = await ApiService.delete(`/projects/${props.projectData.projectId}`);
    emit('projectDeleted', props.projectData.projectId)
  } catch (err) {
    console.log('DELETE NOT WORKING', err)
  }
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
        <p>{{ props.projectData.teamName }}</p>
      </div>
      <div class="table-actions" :class="statusClass">
        <p>{{ statusText }}</p>
        <IconButton :icon="statusIcon" @click="toggleServer"/>
      </div>
    </div>

    <div class="projectAccordion" v-if="accordionToggle">
      <div class="projectAccordionText">
        <p><span class="accordionTitle">Owner:</span>
          {{ `${props.projectData.firstName} ${props.projectData.lastName}` }}</p>

        <p class="accordionResponsiveItems no1"><span class="accordionTitle">Subdomain name:</span>
          {{ props.projectData.subdomainName }}</p>
        <p class="accordionResponsiveItems no2"><span class="accordionTitle">Group name:</span>
          {{ props.projectData.teamName }}</p>

        <p><span class="accordionTitle">UCL mail:</span> {{ props.projectData.uclMail }}</p>
        <p><span class="accordionTitle">Created:</span> {{ projectCreatedDate }}</p>
        <p><span class="accordionTitle">Last change:</span> {{ projectLastChangeDate }}</p>
      </div>

      <div class="projectButtonsContainer">
        <Button icon="restart" text="Restart" @click="restartProject"/>
        <Button icon="trashcan" text="Delete project" danger @click="showModalDeleteModal = true"/>
        <DeleteModal v-if="showModalDeleteModal" :projectName="props.projectData.projectName"
                     @close="showModalDeleteModal = false" @confirm="deleteProject"/>
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