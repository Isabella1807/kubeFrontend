<template>
  <div v-if="show" class="change-password-modal-overlay">
    <div class="change-password-modal-content">
      <div class="change-password-modal-header">
        <h1>Change Password</h1>
        <button class="change-password-modal-close" @click="close">
          ✖
        </button>
      </div>
      <form @submit.prevent="changePassword" class="change-password">
        <label>
          Old Password
          <input type="password" v-model="old_Password" placeholder="Enter old password..." />
        </label>
        <label>
          New Password
          <input type="password" v-model="new_Password" placeholder="Enter new password..." />
        </label>
        <label>
          Repeat New Password
          <input type="password" v-model="repeat_Password" placeholder="Repeat new password..." />
        </label>
        <p v-if="error" class="change-password-error-message">{{ error }}</p>
        <div class="change-password-buttons">
          <button type="button" @click="close" class="change-password-cancel-button">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button type="submit" class="change-password-save-button">
            <i class="fas fa-save"></i> Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ApiService from "@/services/apiServer";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close", "change"]);

const oldPassword = ref("");
const newPassword = ref("");
const repeatPassword = ref("");
const error = ref("");

const close = () => {
  emit("close");
};

const changePassword = async () => {
  if (!oldPassword.value || !newPassword.value || !repeatPassword.value) {
    error.value = "Please fill out all fields.";
    return;
  }
  if (newPassword.value !== repeatPassword.value) {
    error.value = "New passwords do not match.";
    return;
  }

  try {
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    // Send PUT request to backend
    const response = await ApiService.put("/login/changepassword", {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    // If successful, reset form and close modal
    console.log(response.data);
    oldPassword.value = "";
    newPassword.value = "";
    repeatPassword.value = "";
    error.value = "";
    close();
  } catch (err) {
    error.value = err.message || "An error occurred while changing the password";
    console.error("Error during password change:", err);
  }
};
</script>

<style lang="scss" scoped>

.change-password-error-message {
  color: $dangerRed;
  font-size: $font-size-desktop;
  margin-top: 10px;
  text-align: left;
}

.change-password-modal-overlay {
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

.change-password-modal-content {
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.change-password-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.change-password-modal-close {
  position: absolute !important;
  top: 10px !important; 
  right: 10px !important;
  background: none !important;
  border: none !important;
  font-size: 20px !important;
  cursor: pointer;
  color: $primaryPurple !important;
  text-align: right !important;
}

.change-password-modal-content h1 {
  font-size: 35px;
  font-weight: $font-weight;
  text-align: left;
}

.change-password label {
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: $font-weight;
}

.change-password-modal-overlay input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: $font-size-desktop;
  font-style: italic;
  border: 1px solid  $lightGrey;
  border-radius: 5px;
  box-sizing: border-box;
  color: $darkGrey;
}

.change-password-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 25px;
}

.change-password-cancel-button {
  background-color: $white-color !important;
  color: $primaryPurple !important;
  border: 1px solid $primaryPurple !important;
  cursor: pointer !important;
  padding: 6px 12px !important;
  font-size: 15px !important;
  border-radius: 10px !important;
  width: auto !important;
  font-weight: $font-weight!important;
}

.change-password-save-button {
  background-color: $primaryPurple !important;
  color: $white-color !important;
  border: none !important;
  cursor: pointer !important;
  padding: 6px 12px !important;
  font-size: $font-size-desktop !important;
  border-radius: 10px !important;
  width: auto !important;
  font-weight: $font-weight !important;
}

.change-password-cancel-button:hover {
  background-color: $lightGrey !important;
  color: $darkGrey !important;
  border-color: $lightGrey  !important;
}

.change-password-save-button:hover {
  background-color: $lightGrey !important;
  color: $darkGrey !important;
  border-color: $lightGrey  !important;
}

@media (max-width: 768px) {
  .change-password-modal-content {
    width: 90%;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .change-password-modal-content {
    width: 95%;
    padding: 15px;
  }

  .change-password-modal-header h1 {
    font-size: 25px;
  }

  .change-password-buttons {
    flex-direction: column;
  }

  .change-password-cancel-button,
  .change-password-save-button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>