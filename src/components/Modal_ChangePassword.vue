<template>
  <div v-if="show" class="changepasswordmodal-overlay">
    <div class="changepasswordmodal-content">
      <button class="changepasswordmodal-close" @click="close">✖</button>
      <h1>Change Password</h1>
      <form @submit.prevent="changePassword" class="changepassword">
        <label>
          Old Password
          <input type="password" v-model="oldPassword" placeholder="Enter old password..." />
        </label>
        <label>
          New Password
          <input type="password" v-model="newPassword" placeholder="Enter new password..." />
        </label>
        <label>
          Repeat New Password
          <input type="password" v-model="repeatPassword" placeholder="Repeat new password..." />
        </label>
        <p v-if="error" class="changepassworderror-message">{{ error }}</p>
        <div class="changepasswordbuttons">
          <button type="button" @click="close" class="changepasswordcancel-button">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button type="submit" class="changepasswordsave-button">
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

  <style lang="scss">
  
  .changepassworderror-message {
  color: $dangerRed;
  font-size: $font-size-desktop;
  margin-top: 10px;
  text-align: left;
}

.changepasswordmodal-overlay {
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

.changepasswordmodal-content {
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.changepasswordmodal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.changepasswordmodal-close {
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

.changepasswordmodal-content h1 {
  font-size: 35px;
  font-weight: $font-weight;
  text-align: left;
}

.changepassword label {
  display: block;
  font-size: 15px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: $font-weight;
}

.changepasswordmodal-overlay input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  font-size: $font-size-desktop;
  font-style: italic;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  color: $darkGrey;
}

.changepasswordbuttons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 25px;
}

.changepasswordcancel-button {
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

.changepasswordsave-button {
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

.changepasswordcancel-button:hover {
  background-color: $lightGrey !important;
  color: $darkGrey !important;
  border-color: $lightGrey  !important;
}

.changepasswordsave-button:hover {
  background-color: $lightGrey !important;
  color: $darkGrey !important;
  border-color: $lightGrey  !important;
}
  
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
      font-size: 25px;
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