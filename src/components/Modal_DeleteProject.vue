<template>
  <div class="deleteModalOverlay">
    <div class="deleteModal">
      <button @click="emit('close')" class="deleteCloseBtn">
        <i class="fas fa-times modal-icon"></i>
      </button>
      <h1 class="deleteModalTitle">
        Are you sure you want to delete {{ selectedCount > 1 ? `these ${selectedCount} groups` : 'this group' }}?
      </h1>

      <div class="deleteModalButtons">
        <button @click="emit('close')" class="deleteCancelBtn">
          <i class="fas fa-times modal-icon"></i> No, cancel
        </button>
        <button @click="Comfirm" class="deleteConfirmBtn">
          <i class="fas fa-check modal-icon"></i> Yes, confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

// get the selcted items and the number of items 
const props = defineProps({
  selectedCount: {
    type: Number,
    default: 1
  }
});

//  tells the partent component what is happening 
const emit = defineEmits(['close', 'confirm']);

// when you click on confirm or close it will close the modal 
const Comfirm = () => {
  emit('confirm');
  emit('close');
};

</script>

<style lang="scss">
.deleteModalOverlay {
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

.deleteModal {
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center;
}

.deleteCloseBtn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: $primaryPurple;
}

.deleteModalTitle {
  font-size: 35px;
  margin-bottom: 25px;
  font-weight: 700;
  font-family: 'Poppins';
  text-align: left;
}

.deleteModalButtons {
  display: flex;
  justify-content: left;
  gap: 20px;
  margin-top: 25px;
}

.deleteCancelBtn,
.deleteConfirmBtn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 15px;
  border-radius: 10px;
  width: auto;
  font-family: 'Poppins';
  font-weight: 700;
}

.deleteCancelBtn {
  background-color: $white-color;
  color: $primaryPurple;
  border: 1px solid $primaryPurple;
  cursor: pointer;
}

.deleteConfirmBtn {
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