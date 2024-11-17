<template>
    <div class="newuser-modal">
        <div class="newuser-modal-content">
            <button class="newuser-close-btn" @click="emitClose">✖</button>
            <h1>New User</h1>
            <div class="newuser-upload-section">
                <div class="newuser-upload-button">
                    <label class="newuser-upload-label">
                        <i class="fa solid fa-cloud-arrow-up"></i>
                        <span class="newuser-upload-text">
                            {{ filename || "Upload .CSV file" }}
                        </span>
                        <input type="file" accept=".csv" @change="handleFileOpload" hidden />
                    </label>
                    <button v-if="fileName" close="newuser-delete-btn" @click="clearFile" title="Delete File">✖</button>
                </div>
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
            <div v-if="isStudent" class="group-input-section">
                <input type="text" v-model="groupName" placeholder="Group name" class="group-input" />
            </div>
            <div class="newuser-button-section">
                <button class="newuser-cancel-btn" @click="emitClose">
                    <i class="fa-solid fa-times"></i> Cancel
                </button>
                <button class="newuser-save-btn" :disabled="!canSave" @click="saveGroup">
                    <i class="fa-solid fa-floppy-disk"></i> Save Group
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      fileName: "", // Name of the uploaded CSV file
      isStudent: false, // Indicates if "Students" is selected
      isTeacher: false, // Indicates if "Teachers" is selected
      groupName: "", // Name of the student group
    };
  },
  computed: {
    canSave() {
      // Ensure conditions to enable "Save Group" button
      return this.fileName && (this.isTeacher || (this.isStudent && this.groupName));
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === "text/csv") {
        this.fileName = file.name; // Store the uploaded file's name
        console.log("Dummy: File uploaded", file.name); // Dummy log
      } else {
        alert("Please upload a valid .CSV file.");
      }
    },
    clearFile() {
      // Clear the uploaded file
      this.fileName = "";
      console.log("Dummy: File cleared");
    },
    resetFields() {
      // Uncheck the other option and clear group name when toggling
      if (this.isStudent) this.isTeacher = false;
      if (this.isTeacher) {
        this.isStudent = false;
        this.groupName = "";
      }
    },
    emitClose() {
      // Emit close event to parent
      this.$emit("close");
    },
    saveGroup() {
      // Dummy save logic; simply log the input data
      console.log("Dummy Save:", {
        fileName: this.fileName,
        isStudent: this.isStudent,
        isTeacher: this.isTeacher,
        groupName: this.groupName,
      });
      this.emitClose(); // Close the modal after saving
    },
  },
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
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
}
.newuser-modal-content h1 {
    font-size: 35px;
    margin-bottom: 25px;
    font-weight: 700;
    font-family: 'Poppins';
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
.newuser-upload-button {
    display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.newuser-upload-text {
    font-size: 15px;
    font-family: 'Poppins';
}
.newuser-checkbox-item {
    display: block;
}
.newuser-group-input-section {
    margin-top: 20px;
}
.newuser-group-input {
    width: 100%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
}
.newuser-button-section {
    display: flex;
    justify-content: flex-start; 
    gap: 10px; 
    margin-top: 25px;
}
.newuser-cancel-btn, .newuser-save-btn {
    padding: 6px 12px; 
    font-size: 15px;   
    border-radius: 10px; 
    width: auto;      
    font-family: 'Poppins';
    font-weight: 700;
}
.newuser-save.btn:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}
.newuser-save-btn {
      background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
}
.newuser-cancel-btn {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer
}
</style> 