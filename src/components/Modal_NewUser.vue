<template>
  <div class="newuser-modal">
      <div class="newuser-modal-content">
          <button class="newuser-close-btn" @click="handleClose">✖</button>
          <h1>New User</h1>
          <div class="newuser-upload-section">
              <div class="newuser-upload-button">
                  <label class="newuser-upload-label">
                      <i class="fa solid fa-cloud-arrow-up"></i>
                      <span class="newuser-upload-text">
                          {{ fileName || "Upload .CSV file" }}
                      </span>
                      <input type="file" accept=".csv" @change="handleFileUpload" hidden />
                  </label>
                  <button v-if="fileName" class="newuser-delete-btn" @click="clearFile">✖</button>
              </div>
              <div v-if="error" class="error-message">{{ error }}</div>
          </div>
          
          <div class="newuser-checkbox-section">
              <label class="newuser-checkbox-item">
                  <input type="checkbox" v-model="isStudent" @change="resetFields" />
                  Students
              </label>
              <label class="newuser-checkbox-item">
                  <input type="checkbox" v-model="isTeacher" @change="resetFields" />
                  Teachers
              </label>
          </div>        
          <div v-if="isStudent" class="newuser-group-input-section">
              <input type="text" v-model="groupName" placeholder="Group name" class="newuser-group-input"/>
          </div>
          <div class="newuser-button-section">
              <button class="newuser-cancel-btn" @click="handleClose">
                  <i class="fa-solid fa-times"></i> Cancel
              </button>
              <button class="newuser-save-btn" :disabled="!canSave || isLoading"  @click="uploadUsers">
                  <i class="fa-solid fa-spinner fa-spin" v-if="isLoading"></i>
                  <i class="fa-solid fa-floppy-disk" v-else></i>
                  Save Group
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue';
import axios from 'axios';

// close the modal efter a file has been uploaded with a success
const emit = defineEmits(['close', 'upload-success']);

//variables 
const fileName = ref('');
const isStudent = ref(false);
const isTeacher = ref(false);
const groupName = ref('');
const isLoading = ref(false);
const error = ref('');
const fileToUpload = ref(null);

//if a file is uploaded the save button can be clicked on
const canSave = computed(() => 
  fileName.value && 
  fileToUpload.value && 
  (isTeacher.value || (isStudent.value && groupName.value))
);

// this handles the file upload event, name the file and save the file
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file?.type === "text/csv") {
      fileName.value = file.name;
      fileToUpload.value = file;
      error.value = '';
  }
};

// does that you can remove the uploaded file 
const clearFile = () => {
  fileName.value = '';
  fileToUpload.value = null;
  error.value = '';
};
// reset if you have chosen teacher or students 
const resetFields = () => {
  if (isStudent.value) isTeacher.value = false;
  if (isTeacher.value) {
      isStudent.value = false;
      groupName.value = '';
  }
};

//close the modal
const handleClose = () => emit('close');
//uploads the users to server
const uploadUsers = async () => {
  if (!fileToUpload.value || (isStudent.value && !groupName.value)) return;
  
  isLoading.value = true;
  
  //formdata is javascript object that makes is possible to upload and send files
  try {
      const formData = new FormData();
      formData.append('file', fileToUpload.value);
      // uploader the file to backend server API endpoint
      await axios.post('http://localhost:3000/users/upload', formData);
      emit('upload-success');
      handleClose();
  } catch (err) {
      error.value = 'Upload failed';
  } finally {
      isLoading.value = false;
  }
};
</script>

<style lang="scss">

.newuser-modal {
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
.newuser-modal-content {
    background-color: $white-color;
    padding: 30px;
    width: 500px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
}

.newuser-modal-content h1 {
    font-size: $font-size-h1;
    margin-bottom: 25px;
    font-weight: $font-weight;
    text-align: left;
}

.newuser-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $primaryPurple;
}

/* Upload Section */
.newuser-upload-section {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.newuser-upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $lightGrey;
  padding: 10px 15px;
  border-radius: 8px;
  width: 100%;
  max-width: 100%;
  background: $white-color;
  position: relative;
  cursor: pointer;
}
.newuser-upload-label {
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
}
.newuser-upload-label i {
  margin-right: 10px;
  color: $darkGrey;
  cursor: pointer;
}
.newuser-upload-text {
  flex-grow: 1;
  text-align: center;
  color: $darkGrey;
  font-weight: $font-weight;
}

.newuser-delete-btn {
  background: none;
  border: none;
  color: $darkGrey;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

/* check mark sektion */
.newuser-checkbox-section {
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    gap: 20px;  
    align-items: center;
    accent-color: $primaryPurple;
}
.newuser-checkbox-item {
  display: flex;
  align-items: center;
  font-size: $font-size-desktop;
}
.newuser-checkbox-item input {
  margin-right: 10px;
}

/* Group Input */
.newuser-group-input-section {
  margin-bottom: 20px;
  text-align: left;
}
.newuser-group-input {
  width: 100%;
  padding: 8px;
  border: 1px solid $lightGrey;
  border-radius: 4px;
  background: $lightGrey;
}

/* Buttons */
.newuser-button-section {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
}
.newuser-cancel-btn {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer
}
.newuser-save-btn {
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
}

.newuser-cancel-btn, .newuser-save-btn { 
    padding: 6px 12px; 
    font-size: $font-size-desktop;   
    border-radius: 10px; 
    width: auto;      
    font-weight: $font-weight;
    gap: 10px;
}

/* Responsive Design */
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

/* Hover effects */
.newuser-cancel-btn:hover {
    background-color: $lightGrey;  
    color: $darkGrey;  
    border-color: $lightGrey;  
  }
  
  .newuser-save-btn:hover {
    background-color: $lightGrey;  
    color: $darkGrey;  
    border-color: $lightGrey;  
  }
</style>