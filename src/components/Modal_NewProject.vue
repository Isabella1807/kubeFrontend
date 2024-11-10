<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close" @click="close">X</button>
            <h1>New Project</h1>
            <form @submit.prevent="saveProject">
                <label>
                    Project name
                    <input type="text" v-model="projectName" placeholder="Write name" />
                </label>
                <label>
                    Subdomain name
                    <input type="text" v-model="subdomainName" placeholder="Write subdomain name..." />
                </label>
                <label>
                    Pick template
                    <div class="select-container">
                        <select v-model="selectedTemplate" class="custom-select">
                            <option value="" disabled>Pick Template</option>
                            <option value="Template 1">Template 1</option>
                            <option value="Template 2">Template 2</option>
                        </select>
                        <i class="fas fa-chevron-down dropdown-icon"></i>
                    </div>
                </label>
                <div class="buttons">
                    <button type="button" @click="close" class="cancel-button">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button type="submit" class="save-button">
                        <i class="fas fa-save"></i> Save Project
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
            type: Boolean
            required: true, 
        }, 
    },
    emits: ["close", "save"], 
    data() {
        return {
            projectName: "",
            subdomainName: "",
            selectedTemplate: "",
        };
    },
    methods: {
        close() {
            this.$emit("close");
        },
        saveProject() {
            this.$emit("save", {
                projectName: this.projectName,
                subdomainName: this-this.subdomainName,
                selectedTemplate: this.selectedTemplate,
            });
            this.close();
        },
    },
    watch: {
        show(value) {
            if(value) {
                document.body.style.overflow ="hidden";
            } else {
                document.body.style.overflow ="";
            }
        },
    },
};
</script>

