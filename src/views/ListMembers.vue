<template>
  <div>
    <div class="createNewProjectButtonContainer">
      <IconButton icon="addIcon" large primary @click="openCreateUserModal" />
      <h1 class="createProjectText" @click="openCreateUserModal">Create new user</h1>
    </div>
    <NewUserModal v-if="isCreateUserModalVisible" @close="closeCreateUserModal" @uploadSucces="groupUploadSucces" />
    <Modal_EditGroup v-model="isEditModalVisible" :groupName="currentTeam?.teamName"
      :teamId="Number(currentTeam?.teamId)" @close="closeEditModal" @save="saveTeamChanges" />
    <DeleteModal v-if="isDeleteModalVisible" :selectedCount="selectedGroups.length" @confirm="deleteConfirm"
      @close="closeDeleteModal" />
    <table>
      <thead>
        <tr>
          <th>
            <input class="checkbox-btn" type="checkbox" :checked="isAllSelected" @change="toggleAllGroups" />
          </th>
          <th>
            Groups
            <button class="sort-btn" @click="toggleSort">
              <font-awesome-icon :icon="['fas', 'sort-down']" />
            </button>
          </th>
          <th>Members</th>
          <th>
            <div class="flex flex-end">
              <button v-if="showMoreGroupsSelected" class="delete-btn" @click="openDeleteModal()">
                <font-awesome-icon :icon="['far', 'trash-can']" />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.teamId">
          <td>
            <input class="checkbox-btn" type="checkbox" v-model="selectedGroups" :value="group.teamId" />
          </td>
          <td class="font-bold">{{ group.teamName }}</td>
          <td>{{ group.memberCount }}</td>
          <td>
            <div class="flex flex-end">
              <button class="edit-btn" @click="EditGroup(group)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" />
              </button>
              <button class="delete-btn" @click="singleDelete(group.teamId)">
                <font-awesome-icon :icon="['far', 'trash-can']" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
//import the components need for list members 
import { ref, onMounted, computed } from 'vue';
import NewUserModal from "@/components/Modal_NewUser.vue";
import IconButton from "@/components/IconButton.vue";
import Modal_EditGroup from '@/components/Modal_EditGroup.vue';
import DeleteModal from '@/components/Modal_DeleteProject.vue'
import ApiService from '@/services/apiService';

// this is variables like the modals are visable or not 
const groups = ref([]);
const isCreateUserModalVisible = ref(false);
const isEditModalVisible = ref(false);
const currentTeam = ref(null);
const isDeleteModalVisible = ref(false);
const selectedGroups = ref([]);

// loading the teams when the page is open 
onMounted(() => {
  fetchGroups();
});

// this is getting teams for our database 
const fetchGroups = async () => {
  try {
    const response = await ApiService.get('/teams');
    groups.value = response.data.reverse();
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

//opens Create User Modal and closes it too 
const openCreateUserModal = () => {
  isCreateUserModalVisible.value = true;
};

const closeCreateUserModal = () => {
  isCreateUserModalVisible.value = false;
  fetchGroups();
};

// open the modal for edit group and making sure we are saving teams that are being edit 
const EditGroup = (group) => {
  currentTeam.value = group;
  isEditModalVisible.value = true;
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  currentTeam.value = null;
  fetchGroups();
};

const saveTeamChanges = (updatedMembers) => {
  console.log('Members updated:', updatedMembers);
  closeEditModal();
};

//opens Delete Modal and closes it too 
const openDeleteModal = () => {
  isDeleteModalVisible.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalVisible.value = false;
};

const groupUploadSucces = async () => {
  await fetchGroups();
  closeCreateUserModal();
}

// see if there more checkmarks being clicked on with teams 
const showMoreGroupsSelected = computed(() => {
  return selectedGroups.value.length > 1;
});

// seeing if all teams are selected 
const isAllSelected = computed(() => {
  return groups.value.length > 0 && selectedGroups.value.length === groups.value.length;
});

// if teams click with checkmark it gets the id of the team
const toggleAllGroups = (event) => {
  selectedGroups.value = event.target.checked
    ? groups.value.map(group => group.teamId)
    : [];
};

// how to delete i single user in edit group modal 
const singleDelete = (teamId) => {
  currentTeam.value = teamId;
  selectedGroups.value = [teamId];
  isDeleteModalVisible.value = true;
};

// deleting the user when you click on confirm 
const deleteConfirm = async () => {
  try {
    const idsToDelete = selectedGroups.value.length === 1
      ? [currentTeam.value]
      : selectedGroups.value;

    for (const teamId of idsToDelete) {
      await ApiService.delete(`/teams/${teamId}`);
    }
    // make so they page dont have the delete user on it anymore
    await fetchGroups();
    selectedGroups.value = [];
    closeDeleteModal();
  } catch (error) {
    console.error("Error deleting groups:", error);
  }
};

// this is doing the sorting with teams, and getting the new list after being sorted 
const isDescending = ref(false);

const toggleSort = async () => {
  isDescending.value = !isDescending.value;
  try {
    const response = await ApiService.get(`/teams?sort=${isDescending.value ? 'desc' : 'asc'}`);
    groups.value = response.data;
  } catch (error) {
    console.error("Error fetching sorted groups:", error);
  }
};


</script>

<style scoped lang="scss">
.createNewProjectButtonContainer {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;

  .createProjectText {
    margin-left: 10px;
  }
}

@include smallScreen {
  .createNewProjectButtonContainer {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
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
  font-size: 15px;
  margin-left: 4px;
  cursor: pointer;

  .fa-sort-down {
    font-size: 1.5em;
  }
}

.checkbox-btn {
  accent-color: $primaryPurple;
  height: 20px;
  width: 20px;
}

table {
  width: 100%;

  tr {
    th {
      border-bottom: 1px solid $lightGrey;
      text-align: left;
      font-weight: 400;
      padding-left: 8px;
    }

    td {
      border-bottom: 1px solid $lightGrey;
      padding: 20px 0;
      padding-left: 8px;
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
  cursor: pointer;
}

.delete-btn {
  border: none;
  color: $dangerRed;
  font-size: $iconsSize;
  background: none;
  margin-right: 10px;
  cursor: pointer;
}

.font-bold {
  font-weight: $font-weight;
}

[color-scheme='dark'] {
  .edit-btn {
    color: $white-color;

    svg {
      color: $white-color;
    }
  }
}

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

    tr {

      th,
      td {
        font-size: $font-size-mobile;
      }
    }
  }
}
</style>