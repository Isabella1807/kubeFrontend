<template>
    <div class="login-container">
      <!-- Logo and Login Form -->
      <div class="form-container">
        <img src="@/img/logo.png" alt="KubeLab Logo" class="logo" />
        <form>
          <!-- Email Input -->
          <input type="email" placeholder="Email" class="input-field" />
  
          <!-- Password Input -->
          <input type="password" placeholder="Password" class="input-field" />
  
          <!-- Remember Me and Forgot Password -->
          <div class="bottom-links">
            <!-- Remember Me Checkbox -->
            <div class="remember-me">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me" class="remember-me-label">Remember me</label>
            </div>
            <!-- Forgot Password Link -->
            <router-link to="/forgot-password" class="forgot-password">Forgot password?</router-link>
          </div>
  
          <!-- Login Button -->
          <button type="submit" class="login-button">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
  };
  </script>
  
  <style>
  /* Center the container */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #fff; /* White background for the page */
  }
  
  /*logo*/
  
  .logo {
    width: 180px;  /* Adjust this to your desired width */
    height: auto;  /* Keep the aspect ratio of the logo */
    margin-bottom: 20px;  /* Optional: adjust space below the logo */
    align-items: center;
  }
  
  /* Form Container */
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px; /* Limit form width */
    padding: 20px;
    border-radius: 10px;
  }
  
  /* Input Fields */
  .input-field {
    padding: 0.9rem 1.2rem;
    margin: 10px 0;
    width: 100%;
    border-radius: 10px;
    border: none;
    background-color: #f4f4f4;
    font-size: 14px;
    font-style: italic;
  }
  
  /* Bottom Links (Remember Me & Forgot Password) */
  .bottom-links {
    display: flex;
    justify-content: space-between; /* Space between the items */
    width: 100%;
    margin-bottom: 10px;
  }
  
  /* Remember Me Label */
  .remember-me {
    display: flex;
    align-items: center;
  }
  
  .remember-me-label {
    color: #5C007E; 
    font-size: 14px;
    font-weight: 500; 
    cursor: pointer;
  }
  
  /* Forgot Password Link */
  .forgot-password {
    font-size: 14px;
    font-weight: 500;
    color: #5C007E;
    text-decoration: none;
    
  }
  
  .forgot-password:hover {
    text-decoration: underline;
    color: #6e0296;
  }
  
  /* Login Button */
  .login-button {
    padding: 0.9rem 2rem;
    background-color: #5C007E;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    letter-spacing: 1px;
    width: auto;
    margin: 10px 0;
  }
  
  .login-button:hover {
    background-color: #6e0296;
  }
  </style>
  