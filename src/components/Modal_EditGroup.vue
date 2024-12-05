<template>
  <div v-if="modelValue" class="edit-modal-overlay">
    <div class="edit-modal-content">
      <button class="edit-close-button" @click="handleClose">
        <i class="fas fa-times"></i>
      </button>
      <h1 class="edit-title">Edit {{ groupName }}</h1>

      <div class="edit-member-list-header">
        <div class="edit-select-all">
          <input type="checkbox" v-model="selectAll" @change="toggleAll"/> All
        </div>
        <div class="edit-icons">
          <button @click="addMember" class="edit-icon-button-add">
            <i class="fas fa-plus"></i>
          </button>
          <button @click="deleteSelectedMembers" class="edit-icon-button-delete">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      <hr class="edit-divider"/>

      <div class="edit-member-list">
        <ul>
          <li v-for="member in teamMembers" :key="member.userId" class="edit-member-item">
            <input type="checkbox" :value="member.userId" v-model="selectedMembers"/>
            {{ member.firstName }} {{ member.lastName }}
          </li>
        </ul>
      </div>

      <div class="edit-footer">
        <button class="edit-cancel-button" @click="handleClose">
          <i class="fas fa-times"></i> Cancel
        </button>
        <button class="edit-save-button" @click="handleSave">
          <i class="fas fa-save"></i> Save changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import ApiService from '@/services/apiService';

const props = defineProps({
  modelValue: Boolean,
  groupName: String,
  teamId: {
    type: Number,
    default: null
  }
});

const emit = defineEmits(['update:modelValue', 'save', 'close']);

const teamMembers = ref([]);
const selectedMembers = ref([]);
const selectAll = ref(false);

async function fetchTeamMembers() {
  if (!props.teamId) return;

  try {
    const response = await ApiService.get(`/users/team/${props.teamId}/members`);
    teamMembers.value = response.data.users;
  } catch (error) {
    console.error('Error fetching team members:', error);
  }
}

watch(() => props.modelValue, (isModalOpen) => {
  if (isModalOpen && props.teamId) {
    fetchTeamMembers();
  }
});

function toggleAll() {
  if (selectAll.value) {
    selectedMembers.value = teamMembers.value.map(member => member.userId);
  } else {
    selectedMembers.value = [];
  }
}

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

function handleClose() {
  emit('update:modelValue', false);
  emit('close');
}

function handleSave() {
  emit('save', teamMembers.value);
  handleClose();
}

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
</style>