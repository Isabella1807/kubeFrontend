<template>
    <div class="forgot-password-container">
      <div class="form-container">
        <img src="@/img/logo.png" alt="KubeLab Logo" class="logo" />
        <form>
          <!-- Email Input for Forgot Password -->
          <input type="email" placeholder="Enter your email" class="input-field" />
  
          <!-- Message -->
          <p class="message">
            If there is a match, a mail will be sent to your email.
          </p>
  
          <!-- Submit Button -->
          <button type="submit" class="submit-button">Send</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ForgotPassword",
  };
  </script>
  
  <style lang="scss">

  
  /* Center container */
  .forgot-password-container {
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
    font-size: $font-size-mobile;
  }
  
  /* Message under input field */
  .message {
    font-size: 14px;
    color: #333333;
    margin-top: 10px;
    font-style: italic;
  }
  
  /* Submit Button */
  .submit-button {
    padding: 0.9rem 2rem;
    background-color: $primaryPurple;
    color: $white-color;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    letter-spacing: 1px;
    width: auto;
    margin: 10px 0;
  }
  
  .submit-button:hover {
    background-color: #6e0296;
  }
  </style>
  