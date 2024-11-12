<template>
    <header :class="{ 'scrolled-nav': scrolledNav, 'dark-mode': isDark }">
      <nav>
        <div class="branding">
          <RouterLink to="/">
            <img src="../img/kubelab.png" alt="Kubelab logo" />
          </RouterLink>
          <!-- Søgefelt -->
          <div class="soge-felt">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              @input="searchItems"
            />
          </div>
        </div>
  
        <!-- Desktop Navigation -->
        <ul v-show="!mobile" class="navigation1">
          <RouterLink class="link" to="/projects" active-class="active-link">Project</RouterLink>
          <RouterLink class="link" to="/templates" active-class="active-link">Templates</RouterLink>
          <RouterLink class="link" to="/groups" active-class="active-link">Groups</RouterLink>
          
          <label class="switch">
            <input type="checkbox" v-model="isDark" @click="toggleDark()" />
            <span class="slider round">
              <i class="fa-solid fa-moon moon-icon"></i>
              <i class="fa-solid fa-sun sun-icon"></i>
            </span>
          </label>
  
          <!-- Settings Icon and Dropdown -->
          <div class="settings-container">
            <i
              :class="{ 'fa-solid fa-gear': !dropdownOpen, 'fa-solid fa-times': dropdownOpen }"
              class="settings"
              @click="toggleDropdown"
            ></i>
            <transition name="dropdown-fade">
    <div v-if="dropdownOpen" class="dropdown">
      <button class="changepass-btn">Change password</button>

      <label class="switch">
        <input type="checkbox" @change="toggleFontSize" :checked="fontSize === 'large'" />
            <span class="slider round">
              <i class="fa-solid fa-a moon-icon"></i>
              <i class="fa-solid fa-a sun-icon"></i>
            </span>
          </label>

      <!-- Additional Buttons for Font Size -->
      <button @click="changeFontSize('large')">Bigger font size</button>
      <button @click="changeFontSize('default')">Default font size</button>

      <button class="logout-btn">
        Log out
        <i class="fa-solid fa-right-from-bracket logout-icon"></i>
      </button>
    </div>
  </transition>
          </div>
        </ul>
  
        <!-- Mobile Navigation Icon -->
        <div class="icon">
          <i @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" :class="{ 'icon-active': mobileNav }"></i>
        </div>
  
        <!-- Mobile Dropdown Navigation -->
        <transition name="mobile-nav">
          <ul v-show="mobileNav" class="dropdown-nav">
            <RouterLink class="link" to="/projects" active-class="active-link">Project</RouterLink>
            <RouterLink class="link" to="/templates" active-class="active-link">Templates</RouterLink>
            <RouterLink class="link" to="/groups" active-class="active-link">Groups</RouterLink>
            <label class="switch">
              <input type="checkbox" v-model="isDark" @click="toggleDark()" />
              <span class="slider round">
                <i class="fa-solid fa-moon moon-icon"></i>
                <i class="fa-solid fa-sun sun-icon"></i>
              </span>
            </label>
            <div class="settings-container">
              <i
                :class="{ 'fa-solid fa-gear': !dropdownOpen, 'fa-solid fa-times': dropdownOpen }"
                class="settings"
                @click="toggleDropdown"
              ></i>
              <transition name="dropdown-fade">
                <div v-if="dropdownOpen" class="dropdown">
                  <button @click="changeFontSize('large')">Bigger font size</button>
                  <button @click="changeFontSize('default')">Default font size</button>
                </div>
              </transition>
            </div>
          </ul>
        </transition>
      </nav>
    </header>
  </template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = ref(localStorage.getItem('isDarkMode') === 'true');
const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('isDarkMode', isDark.value);
  document.documentElement.setAttribute('color-scheme', isDark.value ? 'dark' : 'light');
};
onMounted(() => {
  document.documentElement.setAttribute('color-scheme', isDark.value ? 'dark' : 'light');
});

const scrolledNav = ref(false);
const mobile = ref(false);
const mobileNav = ref(false);
const searchQuery = ref('');
const windowWidth = ref(window.innerWidth);
const dropdownOpen = ref(false);


const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  mobile.value = windowWidth.value <= 700;
  if (!mobile.value) mobileNav.value = false;
};

const updateScroll = () => {
  scrolledNav.value = window.scrollY > 50;
};

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const fontSize = ref(localStorage.getItem('fontSize') || 'default');

// Funktion til at skifte fontstørrelse
const toggleFontSize = () => {
  const newFontSize = fontSize.value === 'default' ? 'large' : 'default';
  changeFontSize(newFontSize); // Ændrer fontstørrelse med det samme
};

// Funktion til at ændre fontstørrelse
const changeFontSize = (size) => {
  document.documentElement.style.fontSize = size === 'large' ? '1.2rem' : '1rem'; // Skifter mellem stor og normal størrelse
  localStorage.setItem('fontSize', size); // Gemmer valget i localStorage
  fontSize.value = size; // Opdaterer den interne state
};


const searchItems = () => {
  console.log('Searching for: ', searchQuery.value);
};

onMounted(() => {
  window.addEventListener('resize', checkScreen);
  window.addEventListener('scroll', updateScroll);
  checkScreen();
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) changeFontSize(savedFontSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
  window.removeEventListener('scroll', updateScroll);
});


</script>


<style lang="scss">

// Variabler
$transition-duration: 0.5s;
$header-padding: 10px 0;
$max-width-desktop: 1350px;

// Mixins
@mixin transition($duration: $transition-duration) {
    transition: $duration ease all;
}

// Styling



.settings-container {
  position: relative;
  display: inline-block;

  .dropdown {
    position: absolute;
    top: 50px; /* Just over the settings icon */
    right: 0;
    background-color: $white-color;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 15px;
    z-index: 10;
    width: 200px; 

    button {
      display: block;
      background: none;
      border: none;
      padding: 5px 10px;
      font-size: inherit;
      cursor: pointer;
      width: 100%;
      text-align: left;

      &:hover {
        background-color: #f0f0f0;
        border-radius: 5px;
      }

      &:nth-child(2) {
        background-color: $primaryPurple; // Brug variablen for lilla farve, hvis den er defineret
        color: $white-color; // Sørg for, at teksten også er synlig
        border-radius: 5px;

        &:hover {
          background-color: darken($primaryPurple, 10%); // Mørkere lilla ved hover, hvis ønsket
        }
      }
    }
  }
}

.logout-btn {
    color: $offline;

  &:hover {
    opacity: 80%;
  }
}


/* Animation for dropdown */
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
  transition: opacity 0.3s;
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
  opacity: 0;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 35px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $lightGrey;
  border-radius: 34px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 35px;
  width: 45px;
  right: 0px;
  bottom: 0px;
  background-color:$primaryPurple;
  border-radius: 50%;
  transition: 0.4s;
}

/* Ikoner for måne og sol */
.moon-icon, .sun-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  transition: color 0.4s;
}

/* Placér måne til venstre og sol til højre */
.moon-icon {
  left: 12px;
}

.sun-icon {
  right: 12px;
  color: $white-color;
}

input:checked + .slider:before {
  transform: translateX(-40px); /* Justeret position til slider-knappen */
}

input:checked + .slider .moon-icon {
  color:$white-color;
}

input:checked + .slider .sun-icon {
  color: $darkGrey; 
}

.soge-felt {
    margin-left: 20px;
    position: relative;
    
    input {
        padding: 10px 40px;
        font-size: $font-size-desktop;
        border: none ;
        border-radius: 5px;
        background: $bacgroundgrey;
        width: 349px;

        &:focus {
            border-color: $primaryPurple; /* Juster farve efter behov */
            outline: none;
        }
    }

    i {
        font-size: 20px;
        padding: 10px 0px;
        position: absolute; 
        left: 10px; 
        color: $darkGrey; 
        pointer-events: none; 
    }
}

header {
    background-color: $white-color;
    z-index: 2;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    @include transition();

    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: $header-padding;
        margin: 0 auto;
        max-width: $max-width-desktop;
        @include transition();

        .branding {
            display: flex;
            align-items: center;

            img {
                width: 50px;
            }
        }

        .navigation1 {
            display: flex;
            cursor: pointer;
            align-items: center;
            flex: 1;
            justify-content: flex-end;

            .settings {
                font-size: 25px;
                margin-left: 20px;

                &:hover {
                color: $primaryPurple;
            }
        }
        }

        .link {
            font-size: $font-size-desktop;
            font-weight: $font-weight;
            color: $darkGrey;
            list-style: none;
            text-decoration: none;
            margin-right: 30px;
            @include transition();

            &:hover {
                color: $primaryPurple;
            }
        }

        .active-link {
            color: $primaryPurple;
            border-bottom: 3px solid $primaryPurple;
        }

        .icon {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 20px;
            color: $darkGrey;

            i {
                cursor: pointer;
                font-size: 20px;
                @include transition(0.8s);
            }
        }

        .dropdown-nav {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: 0; /* Juster til at være til højre */
            width: 250px;
            height: 100%;
            background-color: $white-color;
            box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2); /* Skab en skygge på venstre side for at indikere sidepanel */
            padding-top: 20px;
            z-index: 100;

            .link {
                font-size: $font-size-mobile;
                color: $darkGrey;
                text-align: left;
                margin: 15px 0;
                padding-left: 20px;

                &:hover {
                background-color: #f0f0f0;
                }
            }
        }


  
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        @include transition(0.5s);
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }
}

</style>