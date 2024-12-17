<template>
  <div class="newProjectOverlay">
    <div class="newProjectContent">
      <button class="newProjectCloseBtn" @click="close">✖</button>
      <h1>New Project</h1>

      <form @submit.prevent="saveProject">
        <label class="darkMode">
          Project name
          <input v-model="projectName" placeholder="Write name..."/>
        </label>
        <label class="darkMode">
          Subdomain name
          <input v-model="subdomainName" placeholder="Write subdomain name..."/>
        </label>
        <label class="darkMode">
          Pick template
          <div class="newProjectSelectContainer">
            <select v-model="selectedTemplate" class="newProjectCustomSelect">
              <option value="" disabled>Pick template...</option>
              <option v-for="template in templateOptions" :key="template.id" :value="template.id">
                {{ template.name }}
              </option>
            </select>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
        </label>
        <p v-if="error" class="newProjectErrorMessage">{{ error }}</p>
        <p v-if="isLoading" class="newProjectLoadingMessage">Opretter projekt. Vent et øjeblik...</p>
        <div class="newProjectButtons">
          <button type="button" @click="close" class="newProjectCancelBtn">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button type="save" class="newProjectSaveBtn">
            <i class="fas fa-save"></i> Save project
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, defineEmits, onMounted} from 'vue';
import ApiService from "@/services/apiService.js";

const emit = defineEmits(['close', 'save']);

const templateOptions = ref([]);
const projectName = ref('');
const subdomainName = ref('');
const selectedTemplate = ref('');
const error = ref('');

const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = false;

  try {
    const dbTemplates = await ApiService.get("/templates");
    templateOptions.value = dbTemplates.data.map((item) => {
      return {name: item.templateName, id: item.templateId}
    })
  } catch {
    console.log("error")
  }
})

const close = () => {
  isLoading.value = false;
  emit('close');
};

const saveProject = async () => {
  if (!projectName.value || !subdomainName.value || !selectedTemplate.value) {
    error.value = 'Please fill out all fields before saving.';
    return;
  }

  isLoading.value = true;

  try {
    const response = await ApiService.post('/projects', {
      projectName: projectName.value,
      subdomainName: subdomainName.value,
      templateId: selectedTemplate.value,
    });

    isLoading.value = false;
    emit('save', response.data);
  } catch (err) {
    isLoading.value = false;
    error.value = err.response.data;
  }
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

.newProjectErrorMessage {
  color: $dangerRed;
  font-size: $font-size-desktop;
  margin-top: 10px;
  text-align: left;
}

.newProjectLoadingMessage {
  color:  $darkGrey;
  font-size: $font-size-desktop;
  margin-top: 10px;
  text-align: left;
}

.newProjectOverlay {
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

.newProjectContent {
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.newProjectCloseBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: $primaryPurple;
}

.newProjectContent h1 {
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

.newProjectOverlay input, .newProjectCustomSelect {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: 14px;
  border: 1px solid $lightGrey;
  border-radius: 5px;
  box-sizing: border-box;
  color: $darkGrey;
}

.newProjectSelectContainer {
  position: relative;
}

.newProjectCustomSelect {
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

.newProjectButtons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 25px;
}

.newProjectCancelBtn, .newProjectSaveBtn {
  padding: 6px 12px;
  font-size: $font-size-desktop;
  border-radius: 10px;
  width: auto;
  font-weight: $font-weight;
}

.newProjectCancelBtn {
  background-color: $white-color;
  color: $primaryPurple;
  border: 1px solid $primaryPurple;
  cursor: pointer
}

.newProjectSaveBtn {
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  cursor: pointer;
}

.newProjectCancelBtn:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}

.newProjectSaveBtn:hover {
  background-color: $lightGrey;
  color: $darkGrey;
  border-color: $lightGrey;
}


@media (max-width: 768px) {
  .newProjectContent {
    width: 90%;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .newProjectContent {
    width: 95%;
    padding: 15px;
  }

  h1 {
    font-size: $font-size-h1-moblie;
  }

  .newProjectButtons {
    flex-direction: column;
  }

  .newProjectButtons button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
  