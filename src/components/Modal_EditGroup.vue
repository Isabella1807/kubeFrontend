<template>
  <div v-if="group_Modal" class="edit_Modal_Overlay">
    <div class="edit_Modal_Content">
      <button class="edit_Close_Button" @click="close">✖</button>
      <h1 class="edit_Title">Edit {{ groupName }}</h1>

      <div class="edit_Member_Header">
        <div class="edit_Select_All">
          <input type="checkbox" v-model="select_All" @change="toogle_All" /> All
        </div>
        <div class="edit_Icons">
          <button @click="open_All_Member = true" class="edit_Icon_Button_Add">
            <i class="fas fa-plus"></i>
          </button>
          <button @click="delete_Checked_Members" class="edit_Icon_Button_Delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr class="edit_Line" />

      <div class="edit_Member_List">
        <ul class="edit_Member_List_All">
          <li v-for="member in team_Members" :key="member.userId" class="edit_Member_Item">
            <div class="edit_Member_Info">
              <input type="checkbox" :value="member.userId" v-model="checked_Members" />
              <span class="edit_Member_Name">{{ member.firstName }} {{ member.lastName }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="edit_Buttons">
        <button class="edit_Cancel_Btn" @click="close">Cancel</button>
        <button class="edit_Save_Btn" @click="save">Save</button>
      </div>
    </div>

    <div v-if="open_All_Member" class="edit_Modal_Overlay">
      <div class="edit_Modal_Content">
        <button class="edit_Close_Button" @click="open_All_Member = false">
          <i class="fas fa-times"></i>
        </button>
        <h1 class="edit_Title">Add new member</h1>

        <div class="add_Member_Change">
          <input v-model="membernew.firstName" placeholder="First Name" class="add_Member_Form_Input" />
          <input v-model="membernew.lastName" placeholder="Last Name" class="add_Member_Form_Input" />
          <input v-model="membernew.uclMail" placeholder="UCL Mail" class="add_Member_Form_Input" />
          <div class="add_Member_Dropdown">
            <select v-model="membernew.roleId" class="input_Field_Member">
              <option value="" disabled selected>Pick a Role</option>
              <option value="2">Teacher</option>
              <option value="3">Student</option>
            </select>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
        </div>

        <div class="edit_Buttons">
          <button class="edit_Cancel_Btn" @click="open_All_Member = false">Cancel</button>
          <button class="edit_Save_Btn" @click="add_Member_New">Add Member</button>
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
  group_Modal: Boolean,
  groupName: String,
  teamId: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:group_Modal', 'save', 'close']);

// the variables 
const team_Members = ref([]);
const checked_Members = ref([]);
const select_All = ref(false);
const open_All_Member = ref(false);
const membernew = ref({
  firstName: '',
  lastName: '',
  uclMail: '',
  roleId: '3'
});

// gets the teams from the database
async function fetchteam_Members() {
  if (!props.teamId) return;
  try {
    const response = await ApiService.get(`/users/team/${props.teamId}/members`);
    team_Members.value = response.data.users;
  } catch (error) {
    console.error('Error fetching team members:', error);
  }
}

// if a user is check with a checkmark you can delete them 
async function delete_Checked_Members() {
  try {
    for (const userId of checked_Members.value) {
      await ApiService.delete(`/users/${userId}`);
    }
    await fetchteam_Members();
    checked_Members.value = [];
    select_All.value = false;
  } catch (error) {
    console.error('Error deleting members:', error);
  }
}

// does you can add someone new to a team 
async function add_Member_New() {
  try {
    const userData = {
      firstName: membernew.value.firstName,
      lastName: membernew.value.lastName,
      uclMail: membernew.value.uclMail,
      roleId: membernew.value.roleId,
      teamId: props.teamId
    };
    await ApiService.post('/users/new', userData);
    await fetchteam_Members();
    open_All_Member.value = false;
    membernew.value = {
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
watch(() => props.group_Modal, (isModalOpen) => {
  if (isModalOpen && props.teamId) {
    fetchteam_Members();
  }
});

// make it so you can click all checkmarks 
function toogle_All() {
  if (select_All.value) {
    checked_Members.value = team_Members.value.map(member => member.userId);
  } else {
    checked_Members.value = [];
  }
}

// does to the user can close the modal
function close() {
  emit('update:group_Modal', false);
  emit('close');
}

// does that we can save the changes 
function save() {
  emit('save', team_Members.value);
  close();
}

</script>

<style lang="scss">
.edit_Modal_Overlay {
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

.edit_Modal_Content {
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

.edit_Close_Button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: $primaryPurple;
}

.edit_Title {
  font-size: $font-size-h1;
  margin-bottom: 25px;
  font-weight: $font-weight;
  text-align: left;
}

.edit_Member_Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit_Select_All {
  font-weight: bold;
  accent-color: $primaryPurple;
}

.edit_Icons {
  display: flex;
  gap: 10px;
}

.edit_Icon_Button_Delete {
  background: none;
  border: none;
  color: $dangerRed;
  font-size: 18px;
  cursor: pointer;
}

.edit_Icon_Button_Add {
  background: none;
  border: none;
  color: $online;
  font-size: 18px;
  cursor: pointer;
}

.edit_Line {
  border: none;
  border-top: 1px solid $lightGrey;
  margin: 10px 0;
}

.edit_Member_List {
  max-height: 300px;
  overflow-y: auto;
}

.edit_Member_List_All {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.edit_Member_Item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  accent-color: $primaryPurple;
}

.edit_Member_Info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.edit_Member_Name {
  text-align: left;
}

.edit_Buttons {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 10px;
}

.edit_Cancel_Btn {
  background-color: $white-color;
  color: $primaryPurple;
  border: 1px solid $primaryPurple;
  cursor: pointer
}

.edit_Save_Btn {
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  cursor: pointer;
}

.edit_Cancel_Btn,
.edit_Save_Btn {
  padding: 6px 12px;
  font-size: $font-size-desktop;
  border-radius: 10px;
  width: auto;
  font-weight: $font-weight;
}

.add_Member_Change {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.add_Member_Form_Input,
.input_Field_Member {
  padding: 0.9rem 1.2rem;
  margin: 10px 0;
  width: 100%;
  border-radius: 10px;
  border: none;
  background-color: $lightGrey;
  font-size: $font-size-desktop;
}

.input_Field_Member {
  appearance: none;
  padding-right: 30px;
  color: $darkGrey;
  background-color: $lightGrey;
}

.add_Member_Dropdown {
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

.edit_Cancel_Btn:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

.edit_Save_Btn:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

@media (max-height: 600px) {
  .edit_Modal_Content {
    max-height: 90vh;
  }

  .edit_Member_List {
    max-height: 60vh;
  }
}
</style>