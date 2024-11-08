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
  },
  {
    projectName: "Portfolie4",
    subdomainName: "hvaaaad.kubelab.dk",
    groupName: "sdfsfsfssffssfsfsfsffdsfsfddsfsdfsdfsfsdfsffs",
    status: true
  }
]
</script>

<template>
  <div class="projectViewContainer">
    <div class="createNewProjectButtonContainer">
      <IconButton icon="addIcon" large primary/>
      <h1 class="createProjectText">Create new project</h1>
    </div>
    <div>
      <ProjectTableWrapper>
        <ProjectRows v-for="item in projectRows" :projectName="item.projectName" :subdomainName="item.subdomainName"
                     :groupName="item.groupName"/>
      </ProjectTableWrapper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projectViewContainer {
  display: flex;
  flex-direction: column;

  .createNewProjectButtonContainer {
    display: flex;
    align-items: center;
    margin-bottom: 4rem;

    .createProjectText {
      margin-left: 10px;
    }
  }
}

@include smallScreen {
  .projectViewContainer {
    flex-direction: column-reverse;
    margin: 1rem;
    height: 100%;
    justify-content: space-between;

    .createNewProjectButtonContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;

      .createProjectText {
        display: none;
      }
    }
  }
}
</style>