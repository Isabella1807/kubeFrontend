<template>
  <div>
    <div class="flex">
      <button class="create-btn">
        <font-awesome-icon :icon="['fas', 'plus']" />
      </button>
      <h2>Create new template</h2>
    </div>

    <table>
      <tr>
        <th>Template name
            <button class="sort-btn">
          <font-awesome-icon :icon="['fas', 'sort-down']" />
        </button>
        </th>
        <th>Services</th>
        <th></th>
      </tr>
     
      <tr>
        <td class="font-bold">WordPress template</td>
        <td>WordPress, Database</td>
        <td>
            <div class="flex flex-end">
            <button class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </button>

            <button class="delete-btn">
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
            </div>
        </td>
      </tr>
      
      <tr>
        <td class="font-bold">Drupal template</td>
        <td>Drupal, Database</td>
        <td>
          <div class="flex flex-end">
            <button class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </button>

            <button class="delete-btn">
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="font-bold">Another template</td>
        <td>Another, Database</td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<style>
.flex {
  display: flex;
  gap: 20px;
  align-items: baseline;
}

.flex .create-btn{
    margin: 50px 0px 60px 0px;
}

.flex-end {
  justify-content: flex-end;
}
.create-btn {
  border-radius: 50%;
  padding: 10px;
  background-color: purple;
  color: white;
  border: none;
}

.create-btn svg {
  font-size: x-large;
}

.sort-btn {
  border: none;
  font-size: large;
  color: purple;
  background-color: white;
}

table {
  width: 100%;
}

.edit-btn {
  border: none;
  font-size: large;
  background-color: white;
}

.delete-btn {
  border: none;
  color: red;
  font-size: large;
  background-color: white;
  margin-right: 10px;
}

table tr th {
  border-bottom: 1px solid #ddd;
  text-align: left;
}
table tr td {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
.font-bold{
    font-weight: 600;
}

table tr th {
font-size: x-small;
font-weight: 400;
}

table tr th:first-child, table tr td:first-child {
  width: 400px;
}
</style>

<script></script>
