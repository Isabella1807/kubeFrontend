<template>
  <div id="template_form">
    <h1>New template</h1>
    <form action="X">
      <label for="tname" class="darkmodelabel">Template name</label>
      <input type="text" id="tname" name="tname" placeholder="Name" />

      <label for="lname" class="darkmodelabel">Template</label>
      <textarea name="" id="" placeholder="Insert code"></textarea>

      <div class="btn-container">
        <RouterLink to="/templates" class="cancel-btn">
          <font-awesome-icon :icon="['far', 'circle-xmark']" />
          Cancel
        </RouterLink>
        <button type="submit" class="save-btn">
          <font-awesome-icon :icon="['far', 'floppy-disk']" />
          Save template
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">

h1 {
  font-size: $font-size-h1;
  margin: 25px 0px;
}

label {
  font-weight: $font-weight;
  font-size: $font-size-desktop;
}

input {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: $lightGrey;
  border: none;
  width: 100%;
  padding: 5px 15px;
  margin-top: 10px;
  margin-bottom: 40px;
}

textarea {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: $lightGrey;
  border: none;
  width: 100%;
  height: 500px;
  padding: 5px 15px;
  margin-top: 10px;
}

.btn-container {
  display: flex;
  margin: 20px 0px;
  gap: 30px;
}

.cancel-btn {
  padding: 5px 25px 5px 10px;
  background: $white-color;
  border: 2px solid $primaryPurple;
  border-radius: 10px;
  color: $primaryPurple;
  font-weight: $font-weight;
  text-decoration:none;
  cursor:pointer;
  svg{
    margin-right: 5px;
  }
}

.save-btn {
  padding: 5px 25px 5px 10px;
  background-color: $primaryPurple;
  color: $white-color;
  border: none;
  border-radius: 10px;
  font-weight: $font-weight;
  cursor:pointer;
  svg{
    margin-right: 5px;
  }
}

/* mobile version*/
@media (max-width: 1350px) {
#template_form{
  padding: 20px;
}

}

</style>

<script setup></script>
