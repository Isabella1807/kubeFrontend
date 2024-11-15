<template>
    <div class="edit-modal-overlay" v-if="showModal">
      <div class="edit-modal-content">
        <button class="edit-close-button" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <h2>Edit {{ groupName }}</h2>
        
        <div class="edit-member-list-header">
          <div class="edit-select-all">
            <input type="checkbox" v-model="selectAll" @change="toggleAll" /> All
          </div>
          <div class="edit-icons">
            <button @click="addMember" class="edit-icon-button-add">
              <i class="fas fa-plus"></i>
            </button>
            <button @click="deleteSelectedMembers" class="edit-icon-button-delete">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
        <hr class="edit-divider" />
        
        <div class="edit-member-list">
          <ul>
            <li v-for="(member, index) in members" :key="member.id" class="edit-member-item">
              <input
                type="checkbox"
                :value="member.id"
                v-model="selectedMembers"
              />
              {{ member.name }}
            </li>
          </ul>
        </div>
  
        <div class="edit-footer">
          <button class="edit-cancel-button" @click="closeModal">
            <i class="fas fa-times-circle"></i> Cancel
          </button>
          <button class="edit-save-button" @click="saveChanges">
            <i class="fas fa-save"></i> Save changes
          </button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
    name: "EditGroupModal",
    props: {
        showModal: Boolean,
        groupName: String,
        initialMembers: Array,
    },
    data() {
        return {
            members: [...this.initialMembers],
            selectedMembers: [],
            selectAll: false,
        };
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        toggleAll() {
            this.selectedMembers = this.selectAll
                ? this.members.map(member => member.id)
                : [];
        },
        deleteSelectedMembers() {
            this.members = this.members.filter(
                member => !this.selectedMembers.includes(member.id)
            );
            this.selectedMembers = [];
            this.selectAll = false;
        },
        saveChanges() {
            this.$emit("save", this.members);
            this.closeModal();
        },
        addMember() {

        }
    },
    watch: {
        selectedMembers() {
            this.selectAll = this.selectedMembers.length === this.members.length;
        }
    }
};

</script>

<style lang="scss">
.edit-modal-overlay {
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

.edit-modal-content {
    background-color: $white-color;
    padding: 30px;
    width: 500px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    text-align: center;
}

.edit-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: $primaryPurple;
}

.edit-title h1 {
    font-size: 35px;
    margin-bottom: 25px;
    font-weight: 700;
    font-family: 'Poppins';
    text-align: left;
}

.edit-member-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.edit-select-all {
    font-weight: bold;
}

.edit-icons {
    display: flex;
    gap: 10px;
}

.edit-icon-button-delete{
    background: none;
    border: none;
    color: $offline;
    font-size: 18px;
    cursor: pointer;
}

.edit-icon-button-add {
    background: none;
    border: none;
    color: $online;
    font-size: 18px;
    cursor: pointer;
}

.edit-divider {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0;
}

.edit-member-list ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.edit-member-item {
    display: flex;
    align-items: center;
    padding: 5px 0;
}

.edit-footer {
    display: flex;
    justify-content:  flex-start;
    margin-top: 20px;
    gap: 10px;
}

.edit-cancel-button {
    background-color: $white-color;
    color: $primaryPurple;
    border: 1px solid $primaryPurple;
    cursor: pointer
}

.edit-save-button {
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    cursor: pointer;
}

.edit-cancel-button,
.edit-save-button {
    padding: 6px 12px; 
    font-size: 15px;   
    border-radius: 10px; 
    width: auto;      
    font-family: 'Poppins';
    font-weight: 700;
}
</style>