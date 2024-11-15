 <template>
    <div class="editmodal-overlay" v-if="showModal">
        <div class="editmodal-content">
            <button class="editclose-button" @click="closeModal">
                <i class="fas fa-times"></i>
            </button>
            <h1 class="edit-title">Edit {{ groupName }}</h1>
            <div class="edit-member-list-header">
                <div class="edit-select-all">
                    <input type="checkbox" v-model="selectAll" @change="toggleAll" /> All
                </div>
                <div class="icons">
                    <button @click="addMember" class="icon-button">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button @click="deleteSelectedMembers" class="icon-button">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <hr class="divider" />
            <div class="edit-member-list">
                <ui>
                    <li v-for="(member, index) in members" :key="member.id" class="edit-member-item">
                       <input type="checkbox" :value="member.id" v-model="selectedMembers" /> 
                    </li>
                </ui>
            </div>
            <div class="footer">
                <button class="edit-cancel-button" @click="closeModal">
                    <i class="fas fa-times-circle"></i> Cancel
                </button>
                <button class="edit-save-button" @click="saveChanges">
                    <i class="fas fa-save"></i> Save Changes
                </button>
            </div>
        </div>
    </div>
 </template>
 
 <script></script>
 <style lang="scss"></style>