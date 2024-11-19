<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" @click="close">✕</button>
      <h1>New Project</h1>
      <form @submit.prevent="saveProject">
        <label class="darkMode">
          Project name
          <input type="text" v-model="projectName" placeholder="Write name..." />
        </label>
        <label class="darkMode">
          Subdomain name
          <input type="text" v-model="subdomainName" placeholder="Write subdomain name..." />
        </label>
        <label class="darkMode">
          Pick template
          <div class="select-container">
            <select v-model="selectedTemplate" class="custom-select">
              <option value="" disabled>Pick template...</option>
              <option value="Template 1">Template 1</option>
              <option value="Template 2">Template 2</option>
            </select>
            <i class="fas fa-chevron-down dropdown-icon"></i>
          </div>
        </label>
        <!-- fejl besked kommer frem -->
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

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close", "save"],
  data() {
    return {
      projectName: "",
      subdomainName: "",
      selectedTemplate: "",
      error: "",  // fejl besked
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    saveProject() {
      // ser om alle felterne er udfyldt
      if (!this.projectName || !this.subdomainName || !this.selectedTemplate) {
        this.error = "Please fill out all fields before saving.";  // viser fejl besked
        return;
      }

      // gemmer projektet med data
      this.$emit("save", {
        projectName: this.projectName,
        subdomainName: this.subdomainName,
        selectedTemplate: this.selectedTemplate,
      });

      // reset input felter
      this.projectName = "";
      this.subdomainName = "";
      this.selectedTemplate = "";
      this.error = "";
      this.close();
    },
  },
};
</script>


  
  <style modal>
  
  .error-message {
    color: red;
    font-size: 15px;
    margin-top: 10px;
    text-align: left;
    font-family: 'Poppins';
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
    background-color: white;
    padding: 30px;
    width: 500px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
    color: #5C007E;
  }
  
  .modal-content h1 {   
    font-size: 35px;
    margin-bottom: 25px;
    font-weight: 700;
    font-family: 'Poppins';
    text-align: left;
  }
  
  form label {
    display: block;
    font-size: 15px;
    margin-bottom: 10px;
    text-align: left;
    font-weight: 400;
    font-family: 'Poppins';
  }
  
  .modal-overlay input, .custom-select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    font-size: 14px;
    font-style: italic;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    box-sizing: border-box;
    color: #333;
  }
  
  .select-container {
    position: relative;
  }
  
  .custom-select {
    appearance: none;
    padding-right: 30px;
    color: #333;
    background-color: white;
  }
  
  .dropdown-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #5C007E;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-start; 
    gap: 10px; 
    margin-top: 25px;
  }
  
  .cancel-button, .save-button {
    padding: 6px 12px; 
    font-size: 15px;   
    border-radius: 10px; 
    width: auto;      
    font-family: 'Poppins';
    font-weight: 700;
  }
  
  .cancel-button {
    background-color: white;
    color: #5C007E;
    border: 1px solid #5C007E;
    cursor: pointer
  }
  
  .save-button {
    background-color: #5C007E;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  /* Hover effects */
  .cancel-button:hover {
    background-color: #eee;  
    color: #333;  
    border-color: #eee;  
  }
  
  .save-button:hover {
    background-color: #3700b3;  
    color: white;  
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);  
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
      font-size: 25 px;
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
  