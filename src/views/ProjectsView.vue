<script setup>
import IconButton from "@/components/IconButton.vue";
import ProjectRows from "@/components/ProjectRows.vue";
import ProjectTableWrapper from "@/components/ProjectTableWrapper.vue";

const projectRows = [
  {
    projectName: "Portfolie",
    subdomainName: "portfolie.kubelab.dk",
    groupName: "QUOE24",
    status: true
  },
  {
    projectName: "Portfolie2",
    subdomainName: "womp.kubelab.dk",
    groupName: "MUOE25",
    status: true
  },
  {
    projectName: "Portfolie3",
    subdomainName: "whooo.kubelab.dk",
    groupName: "WUOE26",
    status: true
  },
  {
    projectName: "Portfolie4",
    subdomainName: "hvaaaad.kubelab.dk",
    groupName: "muuhgruppen",
    status: true
  }
]
</script>

<template>
  <div class="createNewProjectButtonContainer">
    <IconButton icon="addIcon" large primary/>
    <h1 class="createProjectText">Create new project</h1>
  </div>
  <div>
    <ProjectTableWrapper>
      <ProjectRows v-for="item in projectRows" :projectName="item.projectName" :subdomainName="item.subdomainName" :groupName="item.groupName"/>
    </ProjectTableWrapper>
  </div>
</template>

<style scoped lang="scss">
.createNewProjectButtonContainer{
  display: flex;
  align-items: center;
  border: 2px solid red;
  margin-bottom: 4rem;

  .createProjectText{
    margin-left: 10px;
  }
}
</style>