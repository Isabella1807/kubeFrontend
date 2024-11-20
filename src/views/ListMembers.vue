<template>
    <div>
      <div class="flex">
        <button class="create-btn" @click="openCreateUserModal">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <h3 @click="openCreateUserModal">Create new user</h3>
      </div>

      <!-- New User Modal -->
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
          <td class="font-bold">{{ group.name }}</td>
          <td>{{ group.members.length }}</td>
          <td>
            <div class="flex flex-end">
              <button class="edit-btn" @click="openEditModal(group)">
                <font-awesome-icon :icon="['far', 'pen-to-square']" />
              </button>
              <button class="delete-btn">
                <font-awesome-icon :icon="['far', 'trash-can']" />
              </button>
            </div>
          </td>
        </tr>
      </table>

      <!-- Edit Modal -->
      <EditGroupModal v-if="isEditModalVisible" :showModal="isEditModalVisible" :groupName="selectedGroup?.name"
        :initialMembers="selectedGroup?.members" @close="isEditModalVisible = false" @save="saveGroupChanges" />
    </div>
  </template>

<script>
import { defineComponent, ref } from 'vue';
import EditGroupModal from "@/components/Modal_EditGroup.vue";
import NewUserModal from "@/components/Modal_NewUser.vue";  // Import the new modal component

export default defineComponent({
  name: "GroupManagement",
  components: {
    EditGroupModal,
    NewUserModal,  // Register the new modal
  },
  setup() {
    const groups = ref([
      { name: "DCD24", members: [{ id: 1, name: "Anna Jensen" }, { id: 2, name: "Thomas Hansen" }] },
      { name: "WUOE24", members: [{ id: 3, name: "Tobias Hammer" }, { id: 4, name: "Joanna Hoppe" }] },
      { name: "MMD24", members: [{ id: 5, name: "Janus Tomme" }, { id: 6, name: "Martin Hansen" }] },
    ]);

    const isEditModalVisible = ref(false);
    const isCreateUserModalVisible = ref(false);  // To control the new user modal visibility
    const selectedGroup = ref(null);

    const openCreateUserModal = () => {
      isCreateUserModalVisible.value = true; // Show the new user modal
    };

    const closeCreateUserModal = () => {
      isCreateUserModalVisible.value = false; // Close the new user modal
    };

    const openEditModal = (group) => {
      selectedGroup.value = group;
      isEditModalVisible.value = true;
    };

    const saveGroupChanges = (updatedMembers) => {
      if (selectedGroup.value) {
        selectedGroup.value.members = updatedMembers;
      }
      isEditModalVisible.value = false;
    };

    return {
      groups,
      isEditModalVisible,
      isCreateUserModalVisible,
      selectedGroup,
      openCreateUserModal,
      closeCreateUserModal,
      openEditModal,
      saveGroupChanges,
    };
  },
});
</script>

<style lang="scss">
.flex {
  display: flex;
  gap: 20px;
  align-items: baseline;

  .create-btn {
    margin: 50px 0px 60px 0px;
  }
}
.flex {
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

.create-btn {
  svg {
    font-size: x-large;
  }
}

.sort-btn {
  border: none;
  font-size: large;
  color: $primaryPurple;
  background: none;
}

table {
  width: 100%;
  tr {
    th {
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: x-small;
      font-weight: 400;
    }
    td {
      border-bottom: 1px solid #ddd;
      padding: 10px 0 0 0;
    }
    td:first-child,
    th:first-child {
      width: 40px;
    }
  }
}

.edit-btn {
  border: none;
  font-size: large;
  background: none;
}

.delete-btn {
  border: none;
  color: $dangerRed;
  font-size: large;
  background: none;
  margin-right: 10px;
}

.font-bold {
  font-weight: 600;
}

.checkbox-btn {
  height: 20px;
  width: 20px;
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
  }
}
</style>
