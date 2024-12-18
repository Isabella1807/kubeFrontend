<template>
  <div>
    <div class="createNewProjectButtonContainer">
      <RouterLink to="/templates/edit">
        <IconButton icon="addIcon" large primary/>
      </RouterLink>
      <h1 class="createProjectText">Create new template</h1>
    </div>

    <table>
      <tr>
        <th>
          Template name
          <button class="sort-btn">
            <font-awesome-icon :icon="['fas', 'sort-down']"/>
          </button>
        </th>
        <th>Services</th>
        <th></th>
      </tr>

      <tr v-for="(template, index) in templates" :key="index">
        <td class="font-bold">{{ template.templateName }}</td>
        <td class="templatetext">
          <p>{{ template.templateText }}</p>
        </td>
        <td>
          <div class="flex flex-end">
            <RouterLink :to="`/templates/new/${template.templateId}`" class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']"/>
            </RouterLink>
            <button class="delete-btn" @click="deleteTemplate(template.templateId)">
              <font-awesome-icon :icon="['far', 'trash-can']"/>
            </button>

          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import ApiService from "@/services/apiService";
import {ref, onMounted} from "vue";
import IconButton from "@/components/IconButton.vue";

const templates = ref([]);

const fetchTemplates = async () => {
  try {
    const response = await ApiService.get("/templates");
    templates.value = response.data.sort((a, b) => b.templateId - a.templateId);
  } catch (error) {
    console.error("Error fetching templates:", error);
  }
};

const deleteTemplate = async (templateId) => {
  if (!confirm("Are you sure you want to delete this template?")) return;

  try {
    await ApiService.delete(`/templates/${templateId}`);
    templates.value = templates.value.filter((template) => template.templateId !== templateId);
    console.log(`Template with ID ${templateId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting template with ID ${templateId}:`, error);
    alert("Failed to delete template. Please try again.");
  }
};

onMounted(() => {
  fetchTemplates();
});
</script>

<style scoped lang="scss">
.createNewProjectButtonContainer {
  display: flex;
  align-items: center;
  margin-bottom: 4rem;

  .createProjectText {
    margin-left: 10px;
  }
}

.templatetext {
  overflow: hidden;

  p{
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@include smallScreen {
  .createNewProjectButtonContainer {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);

    .createProjectText {
      display: none;
    }
  }
}

.flex {
  display: flex;
  gap: 20px;
  align-items: baseline;

  .create-btn {
    margin: 50px 0px 60px 0px;
  }
}

.flex-end {
  justify-content: flex-end;
}

.create-btn {
  border-radius: 50%;
  padding: 10px;
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  width: 46px;
  height: 46px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-content: center;

  svg {
    font-size: x-large;
  }
}

.sort-btn {
  border: none;
  font-size: $font-size-desktop;
  color: $primaryPurple;
  background: none;
}

.edit-btn {
  border: none;
  font-size: $font-size-desktop;
  background: none;
  color: $darkGrey;
  cursor: pointer;
}

.delete-btn {
  border: none;
  color: $dangerRed;
  font-size: $font-size-desktop;
  background: none;
  margin-right: 10px;
  cursor: pointer;
}

table {
  width: 100%;

  tr {
    th {
      border-bottom: 1px solid $lightGrey;
      text-align: left;
      font-weight: $font-weight;
    }

    td {
      border-bottom: 1px solid $lightGrey;
      padding: 20px 0;
    }

    table tr th:first-child,
    table tr td:first-child {
      width: 400px;
    }
  }
}

.font-bold {
  font-weight: $font-weight;
}

/* mobile version */
@media (max-width: 1200px) {
  .create-btn {
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -0%);
  }

  .flex h3 {
    display: none;
  }

  table {
    padding: 0 10px;

    tr {

      th,
      td {
        width: auto;
        font-size: $font-size-mobile;
      }
    }
  }
}

[color-scheme="dark"] {
  .edit-btn {
    color: $white-color;

    svg {
      color: $white-color;
    }
  }
}
</style>