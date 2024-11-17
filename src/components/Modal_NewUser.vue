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

<script></script>
<style lang="scss"></style>