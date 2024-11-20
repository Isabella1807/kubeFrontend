<template>
    <div class="deletemodal-overlay">
      <div class="deletemodal">

        <button @click="$emit('close')" class="deleteclose-button">
          <i class="fas fa-times modal-icon"></i> 
        </button>
        <h1 class="modal-title">Are you sure you want to delete this user?</h1>
        
        <div class="deletemodal-action">
          <button @click="$emit('close')" class="deletecancel-button">
            <i class="fas fa-times modal-icon"></i> No, cancel
          </button>
          <button @click="deleteUser" class="deleteconfirm-button">
            <i class="fas fa-check modal-icon"></i> Yes, confirm
          </button>
        </div>   
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['close']); //lukker så det går til parent 
  
  const deleteUser = () => {
    // det der gør, som man kan slette brugeren - kan være api her? 
    console.log("User deleted");
  
    // lukker modalen 
    emit('close');
  };
  </script>
  
  <style lang="scss">
  .deletemodal-overlay {
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
  
  
  .deletemodal {
    background-color: #fff;
    padding: 30px;
    width: 500px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
  }
  
  .deleteclose-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $primaryPurple;
  }
  
  .deletemodal-title {
    font-size: 35px;
    margin-bottom: 25px;
    font-weight: 700;
    font-family: 'Poppins';
    text-align: left;
  }

  
  .deletemodal-action {
    display: flex;
    justify-content: left;
    gap: 20px; 
    margin-top: 25px;
  }
  
  .deletecancel-button,
  .deleteconfirm-button {
    display: flex;
    align-items: center; 
    padding: 6px 12px; 
    font-size: 15px;   
    border-radius: 10px; 
    width: auto;      
    font-family: 'Poppins';
    font-weight: 700;
  }
  
  .deletecancel-button {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer
  }
  
  .deleteconfirm-button {
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
  }
  
  
  .modal-icon {
    margin-right: 8px; 
    font-size: 16px;    
  }
  </style>
  