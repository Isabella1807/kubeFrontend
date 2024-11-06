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
  <IconButton icon="playIcon"/>
  <IconButton icon="playIcon" primary/>
  <IconButton icon="playIcon" large/>
  <IconButton icon="playIcon" large primary/>
  <IconButton icon="playIcon" ghost @click="() => console.log('ARGH')"/>
  <IconButton icon="playIcon" large ghost/>
  <div>
    <ProjectTableWrapper>
      <ProjectRows v-for="item in projectRows" :project-name="item.projectName" :subdomain-name="item.subdomainName"/>
    </ProjectTableWrapper>
  </div>
</template>

<style scoped lang="scss">
</style>