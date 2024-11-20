<template>
    <div v-if="show" class="changepasswordmodal-overlay">
      <div class="changepasswordmodal-content">
        <button class="changepasswordmodal-close" @click="close">✕</button>
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
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
      },
    },
    emits: ["close", "change"],
    data() {
      return {
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
        error: "",
      };
    },
    methods: {
      close() {
        this.$emit("close");
      },
      changePassword() {
        if (!this.oldPassword || !this.newPassword || !this.repeatPassword) {
          this.error = "Please fill out all fields.";
          return;
        }
        if (this.newPassword !== this.repeatPassword) {
          this.error = "New passwords do not match.";
          return;
        }
        this.$emit("change", {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
  
        this.oldPassword = "";
        this.newPassword = "";
        this.repeatPassword = "";
        this.error = "";
        this.close();
      },
    },
  };
  </script>
  
  <style lang="scss">

  .changepassworderror-message {
    color: $offline;
    font-size: 15px;
    margin-top: 10px;
    text-align: left;
    font-family: 'Poppins';
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
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
  }
  
  .changepasswordmodal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $primaryPurple;
  }
  
  .changepasswordmodal-content h1 {
    font-size: 35px;
    margin-bottom: 25px;
    font-weight: 700;
    font-family: 'Poppins';
    text-align: left;
  }
  
  .changepassword label {
    display: block;
    font-size: 15px;
    margin-bottom: 10px;
    text-align: left;
    font-weight: 400;
    font-family: 'Poppins';
  }
  
  .changepasswordmodal-overlay input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    font-size: 14px;
    font-style: italic;
    border: 1px solid $lightGrey;
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
  
  .changepasswordcancel-button,
  .changepasswordsave-button {
    padding: 6px 12px;
    font-size: 15px;
    border-radius: 10px;
    width: auto;
    font-family: 'Poppins';
    font-weight: 700;
  }
  
  .changepasswordcancel-button {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer;
  }
  
  .changepasswordsave-button {
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
  }
  
  .changepasswordcancel-button:hover {
    background-color: #eee;  
    color: $darkGrey;  
    border-color: #eee;  
  }
  
  .changepasswordsave-button:hover {
    background-color: #eee;  
    color: $darkGrey;  
    border-color: #eee;  
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