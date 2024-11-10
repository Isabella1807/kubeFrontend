
Jeg har lavet nogle justeringer, så dropdownen vises korrekt lige over indstillingsikonet, og bliver til et kryds, når den er åben. Her er den opdaterede kode:

html
Kopier kode
<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
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
            placeholder="Seach..."
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
              <button @click="changeFontSize('large')">Forstør tekst</button>
              <button @click="changeFontSize('default')">Standard tekst</button>
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
          <RouterLink class="link" to="/" active-class="active-link">Project</RouterLink>
          <RouterLink class="link" to="/templates" active-class="active-link">Templates</RouterLink>
          <RouterLink class="link" to="/groups" active-class="active-link">Groups</RouterLink>
          <label class="switch">
            <input type="checkbox" v-model="isDark" @click="toggleDark()" />
            <span class="slider round">
              <i class="fa-solid fa-moon moon-icon"></i>
              <i class="fa-solid fa-sun sun-icon"></i>
            </span>
          </label>
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
  mobile.value = windowWidth.value <= 768;
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

const changeFontSize = (size) => {
  document.documentElement.style.fontSize = size === 'large' ? '1.2em' : '1em';
  localStorage.setItem('fontSize', size);
};

const searchItems = () => {
  console.log('Søger efter: ', searchQuery.value);
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
$primary-color: #5C007E;
$secondary-color: #333;
$white-color: #fff;
$bacgroundgrey: #F6F6F6;
$header-height: 100%;
$font-size-desktop: 15px;
$font-weight: 700;
$font-size-mobile: 14px;
$transition-duration: 0.5s;
$header-padding: 10px 0;
$max-width-desktop: 1350px;
$max-width-tablet: 700px;
$max-width-mobile: 320px;


// Mixins
@mixin transition($duration: $transition-duration) {
    transition: $duration ease all;
}

@mixin responsive($breakpoint) {
    @media (max-width: $breakpoint) {
        @content;
    }
}

// Styling

.settings-container {
  position: relative;
  display: inline-block;

  .settings {
    font-size: 25px;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      color: $primary-color;
    }
  }

  .dropdown {
    position: absolute;
    top: 30px; /* Just over the settings icon */
    right: 0;
    background-color: $white-color;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 5px;
    z-index: 10;

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
      }
    }
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
  background-color: #eee;
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
  background-color:$primary-color;
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
  color: #fff;
}

input:checked + .slider:before {
  transform: translateX(-40px); /* Justeret position til slider-knappen */
}

input:checked + .slider .moon-icon {
  color: #fff;
}

input:checked + .slider .sun-icon {
  color: #333; 
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
            border-color: #5C007E; /* Juster farve efter behov */
            outline: none;
        }
    }

    i {
        font-size: 20px;
        padding: 10px 0px;
        position: absolute; 
        left: 10px; 
        color: #333; 
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
                color: $primary-color;
            }
            
            }
        }

        .link {
            font-size: $font-size-desktop;
            font-weight: $font-weight;
            color: $secondary-color;
            list-style: none;
            text-decoration: none;
            margin-right: 30px;
            @include transition();

            &:hover {
                color: $primary-color;
            }
        }

        .active-link {
            color: $primary-color;
            border-bottom: 3px solid $primary-color;
        }


        .icon {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 20px;
            color: $secondary-color;

            i {
                cursor: pointer;
                font-size: 20px;
                @include transition(0.8s);
            }
        }

        .icon-active {
            transform: rotate(180deg);
        }

        .dropdown-nav {
            display: flex;
            flex-direction: column;
            position: fixed;
            align-items: center;
            width: 100%;
            max-width: 300px;
            height: 100%;
            z-index: 99;
            background-color: $white-color;
            top: 10px;
            left: 0;

            .link {
                margin-left: 45px;
                margin-top: 20px;
                color: $secondary-color;
                border-color: $primary-color;
            }
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        @include transition(1s);
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }
}

// Responsiv styling

// Desktop (min-width: 1350px)
@include responsive(1350px) {
    nav {
        max-width: $max-width-desktop;
    }

    .link {
        font-size: $font-size-desktop;
    }
}

// Tablet (max-width: 700px)
@include responsive($max-width-tablet) {
    nav {
        max-width: $max-width-tablet;
        flex-direction: column;
        padding: 20px;
    }

    .navigation1 {
        display: none; // Skjuler desktop navigation på tablet og mindre
    }

    .icon {
        right: 20px;
    }

    .dropdown-nav {
        max-width: 100%;
        position: absolute;
    }
}

// Mobil (max-width: 320px)
@include responsive($max-width-mobile) {
    nav {
        max-width: $max-width-mobile;
        padding: 15px;
    }

    .link {
        font-size: $font-size-mobile;
        margin-right: 20px;
    }

    .dropdown-nav {
        max-width: 100%;
        font-size: $font-size-mobile;
    }

    .icon {
        right: 10px;
    }
}

</style>