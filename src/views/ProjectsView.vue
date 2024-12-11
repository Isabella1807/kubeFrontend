<script setup>
import IconButton from "@/components/IconButton.vue";
import ProjectRows from "@/components/ProjectRows.vue";
import ProjectTableWrapper from "@/components/ProjectTableWrapper.vue";
import NewProjectModal from "../components/Modal_NewProject.vue";
import {ref, onMounted} from 'vue';
import ApiService from '../services/apiServer.js';


const projectRows = ref([]);
const templateOptions = ref([]); 
const selectedTemplate = ref(null);
const showModal = ref(false);


onMounted(async () => {
  try {
    const response = await ApiService.get("/projects");
    console.log(response)
    projectRows.value = response.data;
  } catch (error) {
    console.error("Fejl ved API-kald", error.response?.data || error.message);
  }
});

onMounted(async () => {
  try {
    const response = await ApiService.get('/templates');
    templateOptions.value = response.data;
  } catch (err) {
    console.error('Fejl ved hentning af templates:', err);
  }
});

const saveNewProject = async (newProject) => {
    try {
        const response = await ApiService.post('/projects', {
            projectName: newProject.projectName,
            subdomainName: newProject.subdomainName,
            templateId: newProject.selectedTemplate,
        });

        // Places new data first in array
        projectRows.value.unshift(response.data);
        showModal.value = false;
    } catch (error) {
        console.error("Fejl ved oprettelse af projekt:", error.response?.data || error.message);
    }
};

</script>

<template>
  <div class="projectItemsContainer">
    <div class="createNewProjectButtonContainer">
      <IconButton icon="addIcon" large primary @click="showModal = true"/>
      <h1 class="createProjectText">Create new project</h1>
    </div>
    <div>
      <ProjectTableWrapper>
        <ProjectRows v-for="item in projectRows" :key="item.id" :projectData="item"
                     :selectedTemplate="item.selectedTemplate"/>
      </ProjectTableWrapper>
    </div>
  </div>
  <NewProjectModal :show="showModal" @close="showModal = false" @save="saveNewProject"/>
</template>

<style scoped lang="scss">
.projectItemsContainer {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  height: 100%;

  .createNewProjectButtonContainer {
    display: flex;
    align-items: center;

    .createProjectText {
      margin-left: 10px;
    }
  }
}

@include smallScreen {
  .projectItemsContainer {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;

    .createNewProjectButtonContainer {
      display: flex;
      justify-content: center;

      .createProjectText {
        display: none;
      }
    }
  }
}
</style>