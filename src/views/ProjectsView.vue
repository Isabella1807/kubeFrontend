<script setup>
import IconButton from "@/components/IconButton.vue";
import ProjectRows from "@/components/ProjectRows.vue";
import ProjectTableWrapper from "@/components/ProjectTableWrapper.vue";
import Button from "@/components/Button.vue";

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
    projectName: "Portfolie4 sumtin sumtin",
    subdomainName: "hvaaaad.kubelab.dk eller noget hihi",
    groupName: "muuhgruppen som jeg har navngivet her WOW!",
    status: true
  }
]
</script>

<template>
  <div class="projectItemsContainer">
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
    <Button text="Restart" icon="restart"/>
    <Button text="Cancel" icon="circleXmark" hollow/>
    <Button text="Delete Project" icon="trashcan" danger/>
  </div>
</template>

<style scoped lang="scss">
.projectItemsContainer {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  background-color: yellow;
  height: 100%;

  .createNewProjectButtonContainer {
    display: flex;
    align-items: center;
    border: 2px solid red;

    .createProjectText {
      margin-left: 10px;
    }
  }
}

@include smallScreen {
  .projectItemsContainer {
    display: flex;
    flex-direction: column-reverse;
    border: 2px solid blue;
    justify-content: space-between;

    .createNewProjectButtonContainer {
      border: 2px solid red;
      display: flex;
      justify-content: center;

      .createProjectText {
        display: none;
      }
    }
  }
}
</style>