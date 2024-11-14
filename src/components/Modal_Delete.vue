<template>
  <div v-if="show" class="deletemodal-overlay">
    <div class="deletemodal">
      <button @click="$emit('close')" class="deleteclose-button">
        <font-awesome-icon icon="times" />
      </button>
      <h1 class="deletemodal-title">Are you sure you want to delete <span class="highlight">{{ projectName }}</span>?</h1>
      <div class="deletemodal-action">
        <button @click="$emit('close')" class="deletecancel-button">
          <font-awesome-icon icon="times" /> No, cancel
        </button>
        <button @click="$emit('confirm')" class="deleteconfirm-button">
          <font-awesome-icon icon="check" /> Yes, confirm
        </button>
      </div>   
    </div>
  </div>
</template>

<script></script>

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
  background-color: $white-color;
  padding: 30px;
  width: 500px;
  max-width: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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

.highlight {
  color: $primaryPurple;
}

.deletemodal-action {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.deletecancel-button,
.deleteconfirm-button {
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
</style>