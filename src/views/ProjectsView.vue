<script setup>
import IconButton from "@/components/IconButton.vue";
import ProjectRows from "@/components/ProjectRows.vue";
import ProjectTableWrapper from "@/components/ProjectTableWrapper.vue";
import NewProjectModal from "../components/Modal_NewProject.vue";
import {ref, onMounted} from 'vue';

// const projectRows = ref([
//   {
//     projectName: "Portfolie",
//     subdomainName: "portfolie.kubelab.dk",
//     groupName: "QUOE24",
//     status: true,
//     id: 1,
//     owner: "hund",
//     mail: "mail@mail.dk",
//     createdAt: "04-05-2022",
//     lastChange: "07-06-2024",
//     selectedTemplate: "Template 1"
//   },
//   {
//     projectName: "Portfolie2",
//     subdomainName: "womp.kubelab.dk",
//     groupName: "MUOE25",
//     status: true,
//     id: 4,
//     owner: "jens",
//     mail: "hejsa@mail.com",
//     createdAt: "04-05-2005",
//     lastChange: "07-06-2010",
//     selectedTemplate: "Template 2"
//   },
//   {
//     projectName: "Portfolie3",
//     subdomainName: "whooo.kubelab.dk",
//     groupName: "WUOE26",
//     status: false,
//     id: 2,
//     owner: "and",
//     mail: "1234234@mail.dk",
//     createdAt: "02-05-1998",
//     lastChange: "07-06-2000",
//     selectedTemplate: "Template 1"
//   },
//   {
//     projectName: "Portfolie4 sumtin sumtin",
//     subdomainName: "hvaaaad.kubelab.dk eller noget hihi",
//     groupName: "muuhgruppen som jeg har navngivet her WOW!",
//     status: true,
//     id: 3,
//     owner: "gås??",
//     mail: "womp@womp.dk",
//     createdAt: "03-05-2028",
//     lastChange: "07-04-2020",
//     selectedTemplate: "Template 2"
//   }
// ]);



// Create a reactive reference for moods
import ApiService from '../services/apiServer.js';

const projectRows = ref([]);
const templateOptions = ref([]); 
const selectedTemplate = ref(null);

onMounted(async () => {
  try {
    const response = await ApiService.get("/api/projects");
    console.log("API-respons:", response.data); // Tjek hvad der kommer fra API'et
    projectRows.value = response.data;
  } catch (error) {
    console.error("Fejl ved API-kald", error.response?.data || error.message);
  }
});

onMounted(async () => {
  try {
    // Hent templates fra backend
    const response = await ApiService.get('/api/templates'); // Backend skal returnere [{ id, name }]
    templateOptions.value = response.data; // Antager at backend returnerer [{ id, name }]
  } catch (err) {
    console.error('Fejl ved hentning af templates:', err);
  }
});


const showModal = ref(false);  // gør at modal er der

// funktionen til at gemme et nyt projekt
// const saveNewProject = (newProject) => {
//   projectRows.value.unshift(newProject);  // gør at det nye projekt kommer op i toppen
//   showModal.value = false;  // lukker modal
// };

const saveNewProject = async (newProject) => {
  
    try {
        // Send dataene til backend
        const response = await ApiService.post('/api/projects', {
            projectName: newProject.projectName,
            subdomainName: newProject.subdomainName,
            selectedTemplate: newProject.selectedTemplate,
            stackId: 1,  // Eksempel på stackId, du kan tilpasse dette
            userId: 1     // Eksempel på userId, du kan tilpasse dette
        });

        // Hvis projektet blev oprettet, tilføj det til listen i frontend
        projectRows.value.unshift(response.data);  // Tilføj det nye projekt i toppen
        showModal.value = false;  // Luk modal
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
      <pre>{{ projectData }}</pre>
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