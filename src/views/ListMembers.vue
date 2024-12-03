<template>
  <div>
    
    <div class="createNewProjectButtonContainer">
      <IconButton icon="addIcon" large primary @click="openCreateUserModal"/>
      <h1 class="createProjectText" @click="openCreateUserModal">Create new user</h1>
    </div>
    <NewUserModal v-if="isCreateUserModalVisible" @close="closeCreateUserModal" />
    <table>
      <tr>
        <th><input class="checkbox-btn" type="checkbox" /></th>
        <th>
          Groups
          <button class="sort-btn">
            <font-awesome-icon :icon="['fas', 'sort-down']" />
          </button>
        </th>
        <th>Members</th>
        <th></th>
      </tr>
      <tr v-for="(group, index) in groups" :key="index">
        <td><input class="checkbox-btn" type="checkbox" /></td>
        <td class="font-bold">{{ group.teamName }}</td>
        <td>
          <div class="flex flex-end">
            <button class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </button>
            <button class="delete-btn">
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NewUserModal from "@/components/Modal_NewUser.vue";
import IconButton from "@/components/IconButton.vue";
import axios from 'axios';

// Variables to edit modal and create user model
const groups = ref([]);
const isCreateUserModalVisible = ref(false);

// Get the data from group from api and update variables 
const fetchGroups = async () => {
  try {
    const response = await axios.get('/teams');
    groups.value = response.data.reverse();
    console.log('Fetched groups:', groups.value);
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

// Open create user modal --> true means you can see it 
const openCreateUserModal = () => {
  isCreateUserModalVisible.value = true;
};

// Close create modal --> false means you can't see it 
const closeCreateUserModal = () => {
  isCreateUserModalVisible.value = false;
};

onMounted(() => {
  fetchGroups();
});
</script>

<style scoped lang="scss">
.createNewProjectButtonContainer {
display: flex;
align-items: center;
margin-bottom:4rem;

.createProjectText {
  margin-left: 10px;
}
}

@include smallScreen {
.createNewProjectButtonContainer {
  display: flex;
  justify-content: center;
  position:fixed;
  bottom:20px;
  left: 50%;
  transform: translate(-50%, 0);
  .createProjectText {
    display: none;
  }
}
}

.flex {
display: flex;
gap: 20px;
align-items: baseline;

.create-btn {
  margin: 50px 0px 60px 0px;
}
}

.flex-end {
justify-content: flex-end;
}

.create-btn {
border-radius: 50%;
background-color: $primaryPurple;
color: $white-color;
border: none;
width: 46px;
height: 46px;
display: flex;
flex-wrap: wrap-reverse;
justify-content: center;
align-content: center;
}

.sort-btn {
border: none;
color: $primaryPurple;
background: none;
}

table {
width: 100%;
tr {
  th {
    border-bottom: 1px solid $lightGrey;
    text-align: left;
    font-weight: 400;
  }
  td {
    border-bottom: 1px solid $lightGrey;
    padding: 20px 0;
  }
  
  td:first-child,
  th:first-child {
    width: 40px;
  }
}
}

.edit-btn {
border: none;
font-size: $iconsSize;
background: none;
}

.delete-btn {
border: none;
color: $dangerRed;
font-size: $iconsSize;
background: none;
margin-right: 10px;
}

.font-bold {
font-weight: $font-weight;
}

.checkbox-btn {
height: 20px;
width: 20px;
}

[color-scheme='dark']{
.edit-btn{
  color:$white-color;
  svg{
    color:$white-color;
  }
}
}

/* mobile version */
@media (max-width: 1200px) {
.create-btn {
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -0%);
}
.flex h3 {
  display: none;
}
table {
  padding: 0 10px;
  tr{
    th,td{
      font-size: $font-size-mobile;
    }
  }
}
}
</style>