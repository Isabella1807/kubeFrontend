<template>
    <div>
      <div class="flex">
        <RouterLink to="/members/edit" class="create-btn">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </RouterLink>
        <h3>Create new user</h3>
      </div>
  
      <table>
        <tr>
          <th><input class="checkbox-btn" type="checkbox"></th>
          <th>Groups
              <button class="sort-btn">
            <font-awesome-icon :icon="['fas', 'sort-down']" />
          </button>
          </th>
          <th>Members</th>
          <th></th>
        </tr>
       
        <tr>
          <td><input class="checkbox-btn" type="checkbox"></td>
          <td class="font-bold">DCD24</td>
          <td>35</td>
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
          <td><input class="checkbox-btn" type="checkbox"></td>
          <td class="font-bold">WUOE24</td>
          <td>20</td>
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
          <td><input class="checkbox-btn" type="checkbox"></td>
          <td class="font-bold">MMD24</td>
          <td>34</td>
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
    background-color: purple;
    color: white;
    border: none;
    width: 46px;
    height: 46px;
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
    align-content: center;
  }
  
  .create-btn svg {
    font-size: x-large;
  }
  
  .sort-btn {
    border: none;
    font-size: large;
    color: purple;
    background: none;
  }
  
  table {
    width: 100%;
  }
  
  .edit-btn {
    border: none;
    font-size: large;
    background: none;
  }
  
  .delete-btn {
    border: none;
    color: red;
    font-size: large;
    background: none;
    margin-right: 10px;
  }
  
  table tr th {
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  table tr td {
    border-bottom: 1px solid #ddd;
    padding: 10px 0 0 0;
  }
  .font-bold{
      font-weight: 600;
  }
  
  table tr th {
  font-size: x-small;
  font-weight: 400;
  }
  
  table tr th:first-child, table tr td:first-child {
    width: 40px;
  }

  .checkbox-btn{
    height: 20px;
    width: 20px;
  }


  /* mobile version */
  @media (max-width: 1200px) {
    .create-btn{
      position: fixed;
      bottom: 0px;
      left:50%;
      transform: translate(-50%,-0%);
    }
    .flex h3{
      display: none;
    }
    table{
     padding: 0 10px; 
    }
  }
  </style>
  
  <script></script>
  