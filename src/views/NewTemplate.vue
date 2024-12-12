<template>
  <div id="template_form">
    <h1>New template</h1>
    <form @submit.prevent="createTemplate">
      <label for="tname" class="darkmodelabel">Template name</label>
      <input type="text" id="tname" v-model="templateName" placeholder="Name" />

      <label for="templateText" class="darkmodelabel">Template</label>
      <textarea id="templateText" v-model="templateText" placeholder="Insert code"></textarea>

      <!-- Fejlbesked -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="btn-container">
        <RouterLink to="/templates" class="cancel-btn">
          <font-awesome-icon :icon="['far', 'circle-xmark']" />
          Cancel
        </RouterLink>
        <button type="submit" class="save-btn">
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
          Save template
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import yaml from 'js-yaml';
import ApiService from '@/services/apiServer'; // Dit eksisterende service-lag til API-kald

const templateName = ref('');
const templateText = ref('');
const errorMessage = ref('');
const router = useRouter();

const createTemplate = async () => {
  // Clear any previous error messages
  errorMessage.value = '';

  // Check if both fields are filled
  if (!templateName.value || !templateText.value) {
    errorMessage.value = 'Both fields are required';
    return;
  }

  try {
    // Validate YAML format
    yaml.load(templateText.value); // Will throw an error if invalid

  } catch (error) {
    errorMessage.value = 'Invalid YAML format: ' + error.message; // Handle YAML validation error
    return;
  }

  try {
    // Send POST request to backend
    await ApiService.post('/templates', {
      templateName: templateName.value,
      templateText: templateText.value,
    });

    // Navigate back to templates page on success
    router.push('/templates');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'An error occurred while creating the template'; // Handle API error
  }
};
</script>

<style scoped lang="scss">
h1 {
  font-size: $font-size-h1;
  margin: 25px 0px;
}

label {
  font-weight: $font-weight;
  font-size: $font-size-desktop;
}

input {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: $lightGrey;
  border: none;
  width: 100%;
  padding: 5px 15px;
  margin-top: 10px;
  margin-bottom: 40px;
}

textarea {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: $lightGrey;
  border: none;
  width: 100%;
  height: 500px;
  padding: 5px 15px;
  margin-top: 10px;
}

.btn-container {
  display: flex;
  margin: 20px 0px;
  gap: 30px;
}

.cancel-btn {
  padding: 5px 25px 5px 10px;
  background: $white-color;
  border: 2px solid $primaryPurple;
  border-radius: 10px;
  color: $primaryPurple;
  font-weight: $font-weight;
  text-decoration: none;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
}

.save-btn {
  padding: 5px 25px 5px 10px;
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  border-radius: 10px;
  font-weight: $font-weight;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
}

/* mobile version*/
@media (max-width: 1350px) {
  #template_form {
    padding: 20px;
  }

}
</style>
