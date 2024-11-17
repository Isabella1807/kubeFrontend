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
                            {{ fileName || "Upload .CSV file" }}
                        </span>
                        <input type="file" accept=".csv" @change="handleFileUpload" hidden />
                    </label>
                    <!-- viser kun slet knappen, hvis der er fil oploadet -->
                    <button v-if="fileName" class="newuser-delete-btn" @click="clearFile" title="Delete File">✖</button>
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
            <div v-if="isStudent" class="newuser-group-input-section">
                <input type="text" v-model="groupName" placeholder="Group name" class="newuser-group-input" />
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
            fileName: "", // navnet af csv fil som er opoladet
            isStudent: false, // viser om students er valgt
            isTeacher: false, // viser om teachers er valgt
            groupName: "", // gruppe navn
        };
    },
    computed: {
        canSave() {
            // sikker om forholden for at save knappen kan aktiveres 
            return this.fileName && (this.isTeacher || (this.isStudent && this.groupName));
        },
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.type === "text/csv") {
                this.fileName = file.name; //gemmer navnet på filen som er oploadet
                console.log("Dummy: File uploaded", file.name); // Dummy data for nu
            } else {
                alert("Please upload a valid .CSV file.");
            }
        },
        clearFile() {
            // rydder den oploadet file
            this.fileName = "";
            console.log("Dummy: File cleared");
        },
        resetFields() {
            // uncheker den valgte knap
            if (this.isStudent) this.isTeacher = false;
            if (this.isTeacher) {
                this.isStudent = false;
                this.groupName = "";
            }
        },
        emitClose() {
            // gør at modalen lukker og vender tilbage til parent / siden som modalen er på
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
            this.emitClose(); // lukker modalen efter at have gemt den 
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
  font-weight: 700;
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
  font-size: 15px;
  font-weight: 400;
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
  background: $bacgroundgrey;
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
    font-size: 15px;   
    border-radius: 10px; 
    width: auto;      
    font-family: 'Poppins';
    font-weight: 700;
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
    background-color: #eee;  
    color: $darkGrey;  
    border-color: #eee;  
  }
  
  .newuser-save-btn:hover {
    background-color: #eee;  
    color: $darkGrey;  
    border-color: #eee;  
  }
</style>