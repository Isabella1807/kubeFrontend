<template>
  <div id="template_form">
    <h1>{{ isEditing ? "Edit Template" : "New Template" }}</h1>
    <form @submit.prevent="saveTemplate">
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
          {{ isEditing ? "Save Changes" : "Create Template" }}
        </button>
      </div>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import yaml from "js-yaml";
import ApiService from "@/services/apiServer";

const templateName = ref("");
const templateText = ref("");
const errorMessage = ref("");
const isEditing = ref(false);
const route = useRoute();
const router = useRouter();

const fetchTemplate = async (id) => {
  try {
    console.log(`Fetching template with ID: ${id}`);
    const response = await ApiService.get(`/templates/${id}`);
    console.log("Fetched template data:", response.data);

    templateName.value = response.data.templateName;
    templateText.value = response.data.templateText;
    isEditing.value = true;
  } catch (error) {
    console.error("Error fetching template:", error.response?.data || error);
    errorMessage.value = "Failed to load template data.";
  }
};


const saveTemplate = async () => {
  errorMessage.value = "";

  if (!templateName.value || !templateText.value) {
    errorMessage.value = "Both fields are required";
    return;
  }

  try {
    yaml.load(templateText.value); // Validate YAML
  } catch (error) {
    errorMessage.value = "Invalid YAML format: " + error.message;
    return;
  }

  try {
    if (isEditing.value) {
  // Hvis vi er i "edit" mode, send en PUT anmodning til backend
  await ApiService.put(`/templates/${route.params.id}`, {
    templateName: templateName.value,
    templateText: templateText.value,
  });
  alert("Template updated successfully!");
} else {
  // Opret ny template
  await ApiService.post("/templates", {
    templateName: templateName.value,
    templateText: templateText.value,
  });
  alert("Template created successfully!");
}

    router.push("/templates");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Failed to save template.";
  }
};

onMounted(() => {
  if (route.params.id) {
    fetchTemplate(route.params.id);
  }
});
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
