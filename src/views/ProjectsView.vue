<script setup>
import { ref } from 'vue';
import IconButton from "@/components/IconButton.vue";
import ProjectRows from "@/components/ProjectRows.vue";
import ProjectTableWrapper from "@/components/ProjectTableWrapper.vue";
import NewProjectModal from "../components/Modal_NewProject.vue";  

const projectRows = ref([
  {
    projectName: "Portfolie",
    subdomainName: "portfolie.kubelab.dk",
    groupName: "QUOE24",
    status: true,
    selectedTemplate: "Template 1"  
  },
  {
    projectName: "Portfolie2",
    subdomainName: "womp.kubelab.dk",
    groupName: "MUOE25",
    status: true,
    selectedTemplate: "Template 2"
  },
  {
    projectName: "Portfolie3",
    subdomainName: "whooo.kubelab.dk",
    groupName: "WUOE26",
    status: true,
    selectedTemplate: "Template 1"
  },
  {
    projectName: "Portfolie4",
    subdomainName: "hvaaaad.kubelab.dk",
    groupName: "muuhgruppen",
    status: true,
    selectedTemplate: "Template 2"
  }
]);

const showModal = ref(false);  // gør at modal er der

// funktionen til at gemme et nyt projekt
const saveNewProject = (newProject) => {
  projectRows.value.unshift(newProject);  // gør at det nye projekt kommer op i toppen
  showModal.value = false;  // lukker modal
};

</script>

<template>
  <div class="createNewProjectButtonContainer">
    <IconButton icon="addIcon" large primary @click="showModal = true"/>
    <h1 class="createProjectText">Create new project</h1>
  </div>

  <ProjectTableWrapper>
    <ProjectRows
      v-for="item in projectRows" 
      :key="item.projectName"
      :projectName="item.projectName" 
      :subdomainName="item.subdomainName" 
      :groupName="item.groupName"
      :selectedTemplate="item.selectedTemplate" />  <!-- viser den valgte template -->
  </ProjectTableWrapper>

  <!-- New Project Modal -->
  <NewProjectModal :show="showModal" @close="showModal = false" @save="saveNewProject"/>
</template>

<style scoped lang="scss">
.createNewProjectButtonContainer {
  display: flex;
  align-items: center;
  border: 2px solid red;
  margin-bottom: 4rem;
}

.createProjectText {
  margin-left: 10px;
}
</style>