<template>
  <div>
    <h2>New template</h2>
    <form action="X">
      <label for="tname">Template name</label>
      <input
        type="text"
        id="tname"
        name="tname"
        placeholder="Name"
      /><br /><br />

      <label for="lname">Template</label>
      <textarea name="" id="" placeholder="Insert code"></textarea>

      <div class="btn-container">
        <button type="submit" class="cancel-btn">Cancel</button>
        <button type="submit" class="save-btn">Save template</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
h2 {
  font-weight: 700;
}

label {
   
}

input {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

textarea {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.btn-container{
    display: flex;
}

.cancel-btn{

}

.save-btn{

}
</style>

<script setup></script>
