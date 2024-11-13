<template>
  <div id="template_form">
    <h2>New template</h2>
    <form action="X">
      <label for="tname">Template name</label>
      <input type="text" id="tname" name="tname" placeholder="Name" />

      <label for="lname">Template</label>
      <textarea name="" id="" placeholder="Insert code"></textarea>

      <div class="btn-container">
        <button type="submit" class="cancel-btn">
          <font-awesome-icon :icon="['far', 'circle-xmark']" />
          Cancel
        </button>
        <button type="submit" class="save-btn">
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
          Save template
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 700;
  margin: 25px 0px;
}

label {
  font-weight: 600;
}

input {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: rgb(244, 244, 244);
  border: none;
  width: 100%;
  font-style: italic;
  padding: 5px 15px;
  font-weight: 200;
  margin-top: 10px;
  margin-bottom: 40px;
}

textarea {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: rgb(244, 244, 244);
  border: none;
  width: 100%;
  height: 500px;
  font-style: italic;
  padding: 5px 15px;
  font-weight: 200;
  margin-top: 10px;
}

.btn-container {
  display: flex;
  margin: 20px 0px;
  gap: 30px;
}

.cancel-btn {
  padding: 5px 25px 5px 10px;
  background: none;
  border: 4px solid purple;
  border-radius: 10px;
  color: purple;
  font-weight: 600;
}
.cancel-btn svg {
  margin-right: 5px;
}

.save-btn {
  padding: 5px 25px 5px 10px;
  background-color: purple;
  color: white;
  border-radius: 10px;
  font-weight: 600;
}
.save-btn svg {
  margin-right: 5px;
}

/* mobile version*/
@media (max-width: 1200px) {
#template_form{
  padding: 20px;
}

}
</style>

<script setup></script>
