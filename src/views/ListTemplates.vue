<template>
  <div>
    <div class="flex">
      <RouterLink to="/templates/edit" class="create-btn">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </RouterLink>
      <h1>Create new template</h1>
    </div>

    <table>
      <tr>
        <th>
          Template name
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
            <RouterLink to="/templates/edit" class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </RouterLink>

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
            <RouterLink to="/templates/edit" class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </RouterLink>

            <button class="delete-btn">
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
          </div>
        </td>
      </tr>
      <tr>
        <td class="font-bold">Another template</td>
        <td>Another, Database</td>
        <td>
          <div class="flex flex-end">
            <RouterLink to="/templates/edit" class="edit-btn">
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </RouterLink>

            <button class="delete-btn">
              <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
.flex {
  display: flex;
  gap: 20px;
  align-items: baseline;
  
  .create-btn {
    margin: 50px 0px 60px 0px;
  }
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
  width: 46px;
  height: 46px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-content: center;

  svg {
    font-size: x-large;
  }
}

.sort-btn {
  border: none;
  font-size: large;
  color: purple;
  background: none;
}

.edit-btn {
  border: none;
  font-size: large;
  background: none;
  color: #333333;
}

.delete-btn {
  border: none;
  color: red;
  font-size: large;
  background: none;
  margin-right: 10px;
}

table {
  width: 100%;
  tr {
    th {
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: x-small;
      font-weight: 400;
    }
    td {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
    }
    table tr th:first-child,
    table tr td:first-child {
      width: 400px;
    }
  }
}

.font-bold {
  font-weight: 600;
}

/* mobile version */
@media (max-width: 1200px) {
  .create-btn {
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -0%);
  }
  .flex h3 {
    display: none;
  }
  table {
    padding: 0 10px;
    tr {
      th {
        td {
          width: auto;
        }
      }
    }
  }
}
</style>

<script></script>
