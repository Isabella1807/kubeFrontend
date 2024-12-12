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

    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    console.log(userId)

    console.log(response.data[1])

    const sortedProjects = response.data.sort((a, b) => {

      //If it returns 1 - switch places. If returns -1 - do not switch places
      // Place own projects first
      if (a.userId === userId && b.userId !== userId){
        return 1
      }

      if(b.userId === userId && a.userId !== userId){
        return -1
      }

      // if a & b both have my ID or not my ID THEN sort alphabetically by teamName
      if (a.teamName !== b.teamName) {
        return a.teamName > b.teamName ? 1 : -1
      }

      // if same team - sort alphabetically by projectName
      return a.projectName > b.projectName ? 1 : -1
    })

    projectRows.value = sortedProjects;

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

const removeProjectFromList = (projectId) => {
  console.log(projectId)
  projectRows.value = projectRows.value.filter(item => item.projectId !== projectId);
}
</script>

<template>
  <div class="projectItemsContainer">
    <div class="createNewProjectButtonContainer">
      <IconButton icon="addIcon" large primary @click="showModal = true"/>
      <h1 class="createProjectText">Create new project</h1>
    </div>
    <div>
      <ProjectTableWrapper>
        <ProjectRows v-for="item in projectRows" :key="item.projectId" :projectData="item"
                     :selectedTemplate="item.selectedTemplate" @projectDeleted="removeProjectFromList"/>
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