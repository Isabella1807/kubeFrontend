<template>
  <div v-if="modelValue" class="editGroupModalOverlay">
    <div class="editGroupModalContent">
      <button class="editCloseBtn" @click="Close">✖</button>
      <h1 class="groupName">Edit {{ groupName }}</h1>

      <div class="EditGroupMemberHeader">
        <div class="editGroupselectAllMembers">
          <input type="checkbox" v-model="selectAllMembers" @change="toogleAll" /> All
        </div>
        <div class="editIcons">
          <button @click="showNewMember = true" class="EditIconAdd">
            <i class="fas fa-plus"></i>
          </button>
          <button @click="deleteCheckedMembers" class="editIconDelete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr class="EditLine" />

      <div class="editMemberList">
        <ul class="editMemberListAll">
          <li v-for="member in teamMembers" :key="member.userId" class="editNewMemberItem">
            <div class="EditNewMemberInfo">
              <input type="checkbox" :value="member.userId" v-model="selectedMembers" />
              <span class="EditNewMemberName">{{ member.firstName }} {{ member.lastName }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="editGroupFooter">
        <button class="editCancelBtn" @click="Close">Cancel</button>
        <button class="editSaveBtn" @click="handleSave">Save</button>
      </div>
    </div>

    <div v-if="showNewMember" class="editGroupModalOverlay">
      <div class="editGroupModalContent">
        <button class="editCloseBtn" @click="showNewMember = false">
          <i class="fas fa-times"></i>
        </button>
        <h1 class="groupName">Add Member</h1>

        <div class="addNewMemberFormGroup">
          <input v-model="newMember.firstName" placeholder="First Name" class="addNewMemberDetails" />
          <input v-model="newMember.lastName" placeholder="Last Name" class="addNewMemberDetails" />
          <input v-model="newMember.uclMail" placeholder="UCL Mail" class="addNewMemberDetails" />
          <div class="addMember-dropdown-container">
            <select v-model="newMember.roleId" class="addNewMemberInputField">
              <option value="" disabled selected>Select Role</option>
              <option value="2">Teacher</option>
              <option value="3">Student</option>
            </select>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
        </div>

        <div class="editGroupFooter">
          <button class="editCancelBtn" @click="showNewMember = false">Cancel</button>
          <button class="editSaveBtn" @click="addNewMember">Add Member</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ApiService from '@/services/apiService';

// what the modal is using from the parent 
const props = defineProps({
  modelValue: Boolean,
  groupName: String,
  teamId: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'save', 'close']);

// the variables 
const teamMembers = ref([]);
const selectedMembers = ref([]);
const selectAllMembers = ref(false);
const showNewMember = ref(false);
const newMember = ref({
  firstName: '',
  lastName: '',
  uclMail: '',
  roleId: '3'
});

// gets the teams from the database
async function fetchTeamMembers() {
  if (!props.teamId) return;
  try {
    const response = await ApiService.get(`/users/team/${props.teamId}/members`);
    teamMembers.value = response.data.users;
  } catch (error) {
    console.error('Error with getting hold of members:', error);
  }
}

// if a user is check with a checkmark you can delete them 
async function deleteCheckedMembers() {
  try {
    for (const userId of selectedMembers.value) {
      await ApiService.delete(`/users/${userId}`);
    }
    await fetchTeamMembers();
    selectedMembers.value = [];
    selectAllMembers.value = false;
  } catch (error) {
    console.error('Error while deleting members:', error);
  }
}

// does you can add someone new to a team 
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
    showNewMember.value = false;
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

// keeps an eye out for the modal is open or not
watch(() => props.modelValue, (isModalOpen) => {
  if (isModalOpen && props.teamId) {
    fetchTeamMembers();
  }
});

// make it so you can click all checkmarks 
function toogleAll() {
  if (selectAllMembers.value) {
    selectedMembers.value = teamMembers.value.map(member => member.userId);
  } else {
    selectedMembers.value = [];
  }
}

// does to the user can close the modal
function Close() {
  emit('update:modelValue', false);
  emit('close');
}

// does that we can save the changes 
function handleSave() {
  emit('save', teamMembers.value);
  Close();
}

</script>

<style lang="scss">
.editGroupModalOverlay {
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

.editGroupModalContent {
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

.editCloseBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: $primaryPurple;
}

.groupName {
  font-size: $font-size-h1;
  margin-bottom: 25px;
  font-weight: $font-weight;
  text-align: left;
}

.EditGroupMemberHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editGroupselectAllMembers {
  font-weight: bold;
  accent-color: $primaryPurple;
}

.editIcons {
  display: flex;
  gap: 10px;
}

.editIconDelete {
  background: none;
  border: none;
  color: $dangerRed;
  font-size: 18px;
  cursor: pointer;
}

.EditIconAdd {
  background: none;
  border: none;
  color: $online;
  font-size: 18px;
  cursor: pointer;
}

.EditLine {
  border: none;
  border-top: 1px solid $lightGrey;
  margin: 10px 0;
}

.editMemberList {
  max-height: 300px;
  overflow-y: auto;
}

.editMemberListAll {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.editNewMemberItem {
  display: flex;
  align-items: center;
  padding: 10px 0;
  accent-color: $primaryPurple;
}

.EditNewMemberInfo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.EditNewMemberName {
  text-align: left;
}

.editGroupFooter {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 10px;
}

.editCancelBtn {
  background-color: $white-color;
  color: $primaryPurple;
  border: 1px solid $primaryPurple;
  cursor: pointer
}

.editSaveBtn {
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  cursor: pointer;
}

.editCancelBtn,
.editSaveBtn {
  padding: 6px 12px;
  font-size: $font-size-desktop;
  border-radius: 10px;
  width: auto;
  font-weight: $font-weight;
}

.addNewMemberFormGroup {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.addNewMemberDetails,
.addNewMemberInputField {
  padding: 0.9rem 1.2rem;
  margin: 10px 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: $lightGrey;
  font-size: $font-size-desktop;
}

.addNewMemberInputField {
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

.editCancelBtn:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

.editSaveBtn:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

@media (max-height: 600px) {
  .editGroupModalContent {
    max-height: 90vh;
  }

  .editMemberList {
    max-height: 60vh;
  }
}
</style>