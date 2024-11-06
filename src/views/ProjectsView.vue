<script setup>
import CreateButton from "@/components/CreateButton.vue";
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
    subdomainName: "portfolie.kubelab.dk",
    groupName: "QUOE24",
    status: true
  },
  {
    projectName: "Portfolie3",
    subdomainName: "portfolie.kubelab.dk",
    groupName: "QUOE24",
    status: true
  },
]
</script>

<template>
  <h2>Tester:)</h2>
  <CreateButton/>
  <div>
    <ProjectTableWrapper>
      <ProjectRows v-for="item in projectRows" :project-name="item.projectName"/>
    </ProjectTableWrapper>
  </div>
</template>

<style scoped lang="scss">
</style>