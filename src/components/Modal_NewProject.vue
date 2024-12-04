<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" @click="close">✖</button>
      <h1>New Project</h1>
      <form @submit.prevent="saveProject">
        <label class="darkMode">
          Project name
          <input v-model="projectName" placeholder="Write name..." />
        </label>
        <label class="darkMode">
          Subdomain name
          <input v-model="subdomainName" placeholder="Write subdomain name..." />
        </label>
        <label class="darkMode">
          Pick template
          <div class="select-container">
            <select v-model="selectedTemplate" class="custom-select">
              <option value="" disabled>Pick template...</option>
              <option v-for="template in templateOptions" :key="template" :value="template">
                {{ template }}
              </option>
            </select>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
        </label>
        <p v-if="error" class="error-message">{{ error }}</p>
        <div class="buttons">
          <button type="button" @click="close" class="cancel-button">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button type="submit" class="save-button">
            <i class="fas fa-save"></i> Save project
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'save']);

const templateOptions = ['Template 1', 'Template 2'];
const projectName = ref('');
const subdomainName = ref('');
const selectedTemplate = ref('');
const error = ref('');

const close = () => {
  emit('close');
};

const saveProject = () => {
  if (!projectName.value || !subdomainName.value || !selectedTemplate.value) {
    error.value = 'Please fill out all fields before saving.';
    return;
  }

  emit('save', { projectName: projectName.value, subdomainName: subdomainName.value, selectedTemplate: selectedTemplate.value });
  resetForm();
};

const resetForm = () => {
  projectName.value = '';
  subdomainName.value = '';
  selectedTemplate.value = '';
  error.value = '';
  close();
};
</script>
  
<style lang="scss">
  
  .error-message {
    color: $dangerRed;
    font-size: $font-size-desktop;
    margin-top: 10px;
    text-align: left;
  }
 
  .modal-overlay {
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
  
  .modal-content {
    background-color: $white-color;
    padding: 30px;
    width: 500px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
  }
  
  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $primaryPurple;
  }
  
  .modal-content h1 {   
    font-size: $font-size-h1;
    margin-bottom: 25px;
    font-weight: $font-weight;
    text-align: left;
  }
  
  form label {
    display: block;
    font-size: $font-size-desktop;
    margin-bottom: 10px;
    text-align: left;
  }
  
  .modal-overlay input, .custom-select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    font-size: 14px;
    border: 1px solid $lightGrey;
    border-radius: 5px;
    box-sizing: border-box;
    color: $darkGrey;
  }
  
  .select-container {
    position: relative;
  }
  
  .custom-select {
    appearance: none;
    padding-right: 30px;
    color: $darkGrey;
    background-color: $white-color;
  }
  
  .dropdown-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: $primaryPurple;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-start; 
    gap: 10px; 
    margin-top: 25px;
  }
  
  .cancel-button, .save-button {
    padding: 6px 12px; 
    font-size: $font-size-desktop;   
    border-radius: 10px; 
    width: auto;      
    font-weight: $font-weight;
  }
  
  .cancel-button {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer
  }
  
  .save-button {
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
  }
  
  /* Hover effects */
  .cancel-button:hover {
    background-color: $lightGrey;  
    color: $darkGrey;  
    border-color: $lightGrey;  
  }
  
  .save-button:hover {
    background-color: $lightGrey;  
    color: $darkGrey;  
    border-color: $lightGrey;  
  }
  
  
  
  /* Responsive Styles */
  @media (max-width: 768px) {
    .modal-content {
      width: 90%;
      padding: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .modal-content {
      width: 95%;
      padding: 15px;
    }
  
    h1 {
      font-size: $font-size-h1-moblie;
    }
  
    .buttons {
      flex-direction: column;
    }
  
    .buttons button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  </style>
  