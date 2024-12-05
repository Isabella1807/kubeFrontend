<template>
  <div v-if="modelValue" class="edit-modal-overlay">
    <div class="edit-modal-content">
      <button class="edit-close-button" @click="handleClose">
        <i class="fas fa-times"></i>
      </button>
      <h1 class="edit-title">Edit {{ groupName }}</h1>

      <div class="edit-member-list-header">
        <div class="edit-select-all">
          <input type="checkbox" v-model="selectAll" @change="toggleAll" /> All
        </div>
        <div class="edit-icons">
          <button @click="showAddForm = true" class="edit-icon-button-add">
            <i class="fas fa-plus"></i>
          </button>
          <button @click="deleteSelectedMembers" class="edit-icon-button-delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr class="edit-divider" />

      <div class="edit-member-list">
        <ul>
          <li v-for="member in teamMembers" :key="member.userId" class="edit-member-item">
            <input type="checkbox" :value="member.userId" v-model="selectedMembers" />
            {{ member.firstName }} {{ member.lastName }}
          </li>
        </ul>
      </div>

      <div class="edit-footer">
        <button class="edit-cancel-button" @click="handleClose">Cancel</button>
        <button class="edit-save-button" @click="handleSave">Save changes</button>
      </div>
    </div>

    <div v-if="showAddForm" class="edit-modal-overlay">
      <div class="edit-modal-content">
        <button class="edit-close-button" @click="showAddForm = false">
          <i class="fas fa-times"></i>
        </button>
        <h1 class="edit-title">Add Member</h1>

        <div class="addMember-form-group">
          <input v-model="newMember.firstName" placeholder="First Name" class="addMember-form-input" />
          <input v-model="newMember.lastName" placeholder="Last Name" class="addMember-form-input" />
          <input v-model="newMember.uclMail" placeholder="UCL Mail" class="addMember-form-input" />
          <div class="addMember-dropdown-container">
            <select v-model="newMember.roleId" class="addMember-input-field">
              <option value="" disabled selected>Select Role</option>
              <option value="2">Teacher</option>
              <option value="3">Student</option>
            </select>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
        </div>

        <div class="edit-footer">
          <button class="edit-cancel-button" @click="showAddForm = false">Cancel</button>
          <button class="edit-save-button" @click="addNewMember">Add Member</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import ApiService from '@/services/apiService';

// props that being recived from the parent (listmembers)
const props = defineProps({
  modelValue: Boolean, // this checks if the modal is open or not
  groupName: String,
  teamId: {
    type: Number,
    default: null
  }
});

// this does that you can commicate with the parent
const emit = defineEmits(['update:modelValue', 'save', 'close']);
//all information needed
const teamMembers = ref([]);
const selectedMembers = ref([]);
const selectAll = ref(false);
const showAddForm = ref(false);
const newMember = ref({
  firstName: '',
  lastName: '',
  uclMail: '',
  roleId: '3'
});

// finds team members
async function fetchTeamMembers() {
  if (!props.teamId) return;
  try {
    const response = await ApiService.get(`/users/team/${props.teamId}/members`);
    teamMembers.value = response.data.users;
  } catch (error) {
    console.error('Error fetching team members:', error);
  }
}
// this does it so when you select a member you can delete them
async function deleteSelectedMembers() {
  try {
    for (const userId of selectedMembers.value) {
      await ApiService.delete(`/users/${userId}`);
    }
    await fetchTeamMembers();
    selectedMembers.value = [];
    selectAll.value = false;
  } catch (error) {
    console.error('Error deleting members:', error);
  }
}
// this is how you add a single new member
async function addNewMember() {
  try {
    const userData = {
      firstName: newMember.value.firstName,
      lastName: newMember.value.lastName,
      uclMail: newMember.value.uclMail,
      roleId: newMember.value.roleId,
      teamId: props.teamId
    };
    await ApiService.post('/users/new', userData);
    await fetchTeamMembers();
    showAddForm.value = false;
    newMember.value = {
      firstName: '',
      lastName: '',
      uclMail: '',
      roleId: '3'
    };
  } catch (error) {
    console.error('Error adding member:', error);
  }
}

// watching if the modal is open, and when it opens it gets team members
watch(() => props.modelValue, (isModalOpen) => {
  if (isModalOpen && props.teamId) {
    fetchTeamMembers();
  }
});
// makes so you can checkmark all
function toggleAll() {
  if (selectAll.value) {
    selectedMembers.value = teamMembers.value.map(member => member.userId);
  } else {
    selectedMembers.value = [];
  }
}
// does so you can close and save events
function handleClose() {
  emit('update:modelValue', false);
  emit('close');
}

function handleSave() {
  emit('save', teamMembers.value);
  handleClose();
}
// this counts if all members are selected
const isAllSelected = computed(() =>
    selectedMembers.value.length === teamMembers.value.length
);
</script>

<style lang="scss">

.edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.edit-modal-content {
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.edit-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: $primaryPurple;
}

.edit-title {
  font-size: $font-size-h1;
  margin-bottom: 25px;
  font-weight: $font-weight;
  text-align: left;
}

.edit-member-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-select-all {
  font-weight: bold;
  accent-color: $primaryPurple;
}

.edit-icons {
  display: flex;
  gap: 10px;
}

.edit-icon-button-delete {
  background: none;
  border: none;
  color: $dangerRed;
  font-size: 18px;
  cursor: pointer;
}

.edit-icon-button-add {
  background: none;
  border: none;
  color: $online;
  font-size: 18px;
  cursor: pointer;
}

.edit-divider {
  border: none;
  border-top: 1px solid $lightGrey;
  margin: 10px 0;
}

.edit-member-list ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.edit-member-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  accent-color: $primaryPurple;
}

.edit-footer {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 10px;
}

.edit-cancel-button {
  background-color: $white-color;
  color: $primaryPurple;
  border: 1px solid $primaryPurple;
  cursor: pointer
}

.edit-save-button {
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  cursor: pointer;
}

.edit-cancel-button,
.edit-save-button {
  padding: 6px 12px;
  font-size: $font-size-desktop;
  border-radius: 10px;
  width: auto;
  font-weight: $font-weight;
}

.addMember-form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.addMember-form-input,
.addMember-input-field {
  padding: 0.9rem 1.2rem;
  margin: 10px 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: $lightGrey;
  font-size: $font-size-desktop;
}

.addMember-input-field {
  appearance: none;
  padding-right: 30px;
  color: $darkGrey;
  background-color: $lightGrey;
}

.addMember-dropdown-container {
  position: relative;
  width: 100%;
}

.dropdown-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: $primaryPurple;
}

.edit-cancel-button:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

.edit-save-button:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

</style>