<template>
  <div class="newUserModal" >
      <div class="newUserModalContent">
          <button class="newUserCloseBtn" @click="Close">✖</button>
          <h1>New User</h1>
          <div class="newUserUpload">
              <div class="newUserUploadBtn">
                  <label class="newUserUploadLabel">
                      <i class="fa solid fa-cloud-arrow-up"></i>
                      <span class="newUserUploadText">
                          {{ nameOfFile || "Upload .CSV file" }}
                      </span>
                      <input type="file" accept=".csv" @change="FileUpload" hidden />
                  </label>
                  <button v-if="nameOfFile" class="newUserDeleteBtn" @click="refreshFile">✖</button>
              </div>
          </div>
          
          <div class="newUserCheckbox">
              <label class="newUserCheckboxItem">
                  <input type="checkbox" v-model="pickStudent" @change="resetFields" />
                  Students
              </label>
              <label class="newUserCheckboxItem">
                  <input type="checkbox" v-model="pickTeacher" @change="resetFields" />
                  Teachers
              </label>
          </div>        
          <div v-if="pickStudent || pickTeacher" class="newUserRolePick">
              <input type="text" v-model="groupName" placeholder="Group name" class="newUserOwnNameInput"/>
          </div>
          <div class="newUserButtons">
              <button class="newUserCancelBtn" @click="Close">
                  <i class="fa-solid fa-times"></i> Cancel
              </button>
              <button class="newUserSaveBtn" @click="uploadUsers">
                  <i class="fa-solid fa-floppy-disk"></i>
                  Save Group
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import ApiService from '@/services/apiService';

const emit = defineEmits(['close', 'upload-success']);


const nameOfFile = ref('');
const pickStudent = ref(false);
const pickTeacher = ref(false);
const groupName = ref('');
const isLoading = ref(false);
const error = ref('');
const fileToUpload = ref(null);


const FileUpload = (event) => {
  const file = event.target.files[0];
  if (file?.type === "text/csv") {
      nameOfFile.value = file.name;
      fileToUpload.value = file;
      error.value = '';
  }
};


const refreshFile = () => {
  nameOfFile.value = '';
  fileToUpload.value = null;
  error.value = '';
};

const resetFields = () => {
  if (pickStudent.value) pickTeacher.value = false;
  if (pickTeacher.value) {
      pickStudent.value = false;
  }
};


const Close = () => emit('close');

const uploadUsers = async () => {
  if (!fileToUpload.value || (pickStudent.value && !groupName.value)) return;
  
  isLoading.value = true;
  

  try {
      const formData = new FormData();
      formData.append('file', fileToUpload.value);
      formData.append('teamName', groupName.value);
      await ApiService.post('http://localhost:3000/users/upload', formData);
      emit('upload-success');
      Close();
  } catch (err) {
      error.value = 'Upload failed';
  } finally {
      isLoading.value = false;
  }
};

</script>

<style lang="scss">

.newUserModal {
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
.newUserModalContent {
    background-color: $white-color;
    padding: 30px;
    width: 500px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
}

.newUserModalContent h1 {
    font-size: $font-size-h1;
    margin-bottom: 25px;
    font-weight: $font-weight;
    text-align: left;
}

.newUserCloseBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $primaryPurple;
}

.newUserUpload {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.newUserUploadBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  background: $white-color;
  position: relative;
  cursor: pointer;
}
.newUserUploadLabel {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
}
.newUserUploadLabel i {
  margin-right: 10px;
  color: $darkGrey;
  cursor: pointer;
}
.newUserUploadText {
  flex-grow: 1;
  text-align: center;
  color: $darkGrey;
  font-weight: $font-weight;
}

.newUserDeleteBtn {
  background: none;
  border: none;
  color: $darkGrey;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

.newUserCheckbox {
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    gap: 20px;  
    align-items: center;
    accent-color: $primaryPurple;
}
.newUserCheckboxItem {
  display: flex;
  align-items: center;
  font-size: $font-size-desktop;
}
.newUserCheckboxItem input {
  margin-right: 10px;
}


.newUserRolePick {
  margin-bottom: 20px;
  text-align: left;
}
.newUserOwnNameInput {
  width: 100%;
  padding: 8px;
  border: 1px solid $lightGrey;
  border-radius: 4px;
  border: none;
  background: $lightGrey;
}


.newUserButtons {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
}
.newUserCancelBtn {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer
}
.newUserSaveBtn {
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
}

.newUserCancelBtn, .newUserSaveBtn { 
    padding: 6px 12px; 
    font-size: $font-size-desktop;   
    border-radius: 10px; 
    width: auto;      
    font-weight: $font-weight;
    gap: 10px;
}


@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    padding: 15px;
  }
  h2 {
    font-size: 18px;
  }
  .button-section {
    flex-direction: column;
    gap: 10px;
  }
  .cancel-btn,
  .save-btn {
    width: 100%;
  }
}


.newUserCancelBtn:hover {
    background-color: $lightGrey;  
    color: $darkGrey;  
    border-color: $lightGrey;  
  }
  
  .newUserSaveBtn:hover {
    background-color: $lightGrey;  
    color: $darkGrey;  
    border-color: $lightGrey;  
  }
</style>