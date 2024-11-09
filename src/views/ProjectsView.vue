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
    status: true,
    id: 1,
    owner: "hund",
    mail: "mail@mail.dk",
    createdAt: "04-05-2022",
    lastChange: "07-06-2024"
  },
  {
    projectName: "Portfolie2",
    subdomainName: "womp.kubelab.dk",
    groupName: "MUOE25",
    status: true,
    id: 4,
    owner: "jens",
    mail: "hejsa@mail.com",
    createdAt: "04-05-2005",
    lastChange: "07-06-2010"
  },
  {
    projectName: "Portfolie3",
    subdomainName: "whooo.kubelab.dk",
    groupName: "WUOE26",
    status: false,
    id: 2,
    owner: "and",
    mail: "1234234@mail.dk",
    createdAt: "02-05-1998",
    lastChange: "07-06-2000"
  },
  {
    projectName: "Portfolie4 sumtin sumtin",
    subdomainName: "hvaaaad.kubelab.dk eller noget hihi",
    groupName: "muuhgruppen som jeg har navngivet her WOW!",
    status: true,
    id: 3,
    owner: "gås??",
    mail: "womp@womp.dk",
    createdAt: "03-05-2028",
    lastChange: "07-04-2020"
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
        <ProjectRows v-for="item in projectRows" :key="item.id" :projectData="item"/>
      </ProjectTableWrapper>
    </div>
  </div>
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