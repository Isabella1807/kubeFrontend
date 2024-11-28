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
            <router-link to="/forgot-password" class="forgot-password">Forgot password</router-link>
          </div>
  
            <!-- Login Button -->
        <router-link to="/projects">
          <button type="button" class="login-button">Login</button>
        </router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Login",
  };
  </script>
  
  <style lang="scss">
  /* Center the container */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: transparent; 
  }
  
  /*logo*/
  
  .logo {
    width: 180px;  
    height: auto;  
    margin-bottom: 20px;  
    align-items: center;
  }
  
  /* Form Container */
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px; 
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
    background-color: $lightGrey;
    font-size: $font-size-desktop;
  }
  
  /* Bottom Links (Remember Me & Forgot Password) */
  .bottom-links {
    display: flex;
    justify-content: space-between; 
    width: 100%;
    margin-bottom: 10px;
  }
  
  /* Remember Me Label */
  .remember-me {
    display: flex;
    align-items: center;
    accent-color: $primaryPurple;
  }
  
  .remember-me-label {
    color: $primaryPurple; 
    font-size: $font-size-desktop;
    font-weight: 400; 
    cursor: pointer;
    margin-left: 5px;
  }
  
  /* Forgot Password Link */
  .forgot-password {
    font-size: $font-size-desktop;
    font-weight: 400;
    color: $primaryPurple;
    text-decoration: none;
    
  }
  
  .forgot-password:hover {
    text-decoration: underline;
    color: #6e0296;
  }
  
  /* Login Button */
  .login-button {
    padding: 0.9rem 2rem;
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    border-radius: 10px;
    font-weight: $font-weight;
    font-size: $font-size-desktop;
    cursor: pointer;
    letter-spacing: 1px;
    width: auto;
    margin: 10px 0;
  }
  
  .login-button:hover {
    background-color: #6e0296;
  }
  </style>
  