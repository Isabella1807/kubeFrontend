<template>
  <div v-if="$route.meta && !$route.meta.hideHeader">
    <header :class="{ 'scrolled-nav': scrolledNav, 'dark-mode': isDark }">

      <nav>
        <div class="branding">
          <RouterLink to="/projects">
            <img src="../img/kubelab.png" alt="Kubelab logo" />
          </RouterLink>

          <!-- Søgefelt -->
          <div class="soge-felt">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" v-model="searchQuery" placeholder="Search..." @input="searchItems" />
          </div>
        </div>

        <!-- Desktop Navigation -->
        <ul v-show="!mobile" class="navigation1">
          <RouterLink class="link" to="/projects" active-class="active-link" v-if="isStudentOrAnyone">Project</RouterLink>
          <RouterLink class="link" to="/templates" active-class="active-link" v-if="isAdmin">Templates</RouterLink>
          <RouterLink class="link" to="/groups" active-class="active-link" v-if="isAdminOrFaculty">Groups</RouterLink>

          <label class="switch">
            <input type="checkbox" v-model="isDark" @click="toggleDark()" />
            <span class="slider round">
              <i class="fa-solid fa-moon moon-icon"></i>
              <i class="fa-solid fa-sun sun-icon"></i>
            </span>
          </label>

          <!-- Settings Icon and Dropdown -->
          <div class="settings-container">
            <i :class="{ 'fa-solid fa-gear': !dropdownOpen, 'fa-solid fa-times': dropdownOpen }" class="settings"
              @click="toggleDropdown"></i>
            <transition name="dropdown-fade">
              <div v-if="dropdownOpen" class="dropdown">

                <ModalChangePassword :show="showChangePasswordModal" @close="showChangePasswordModal = false"
                  @change="handlePasswordChange" />
                <button @click="showChangePasswordModal = true" class="changepass-btn">
                  Change Password
                </button>


                <label class="font-size-toggle">
                  <input type="checkbox" @change="toggleFontSize" :checked="fontSize === 'large'" />
                  <span class="slider-font">
                    <i class="fa-solid fa-text-height aa-icon"></i>
                    <i class="fa-solid fa-text-height a-icon"></i>
                  </span>
                </label>

                <button class="logout-btn" @click="logout">
                  Log out
                  <i class="fa-solid fa-right-from-bracket logout-icon"></i>
                </button>
              </div>
            </transition>
          </div>
        </ul>

        <!-- Mobile Navigation Icon -->
        <div class="icon">
          <i @click="toggleMobileNav" v-show="mobile" :class="mobileNav ? 'fa-solid fa-times' : 'fa-solid fa-bars'"></i>
        </div>

        <!-- Mobile Dropdown Navigation -->
        <transition name="mobile-nav">
          <ul v-show="mobileNav" class="dropdown-nav">
            <RouterLink class="link" to="/projects" active-class="active-link" v-if="isStudentOrAnyone">Project</RouterLink>
            <RouterLink class="link" to="/templates" active-class="active-link" v-if="isAdmin">Templates</RouterLink>
            <RouterLink class="link" to="/groups" active-class="active-link" v-if="isAdminOrFaculty">Groups</RouterLink>
            <label class="switch">
              <input type="checkbox" v-model="isDark" @click="toggleDark()" />
              <span class="slider round">
                <i class="fa-solid fa-moon moon-icon"></i>
                <i class="fa-solid fa-sun sun-icon"></i>
              </span>
            </label>

            <label class="font-size-toggle">
              <input type="checkbox" @change="toggleFontSize" :checked="fontSize === 'large'" />
              <span class="slider-font">
                <i class="fa-solid fa-text-height aa-icon"></i>
                <i class="fa-solid fa-text-height a-icon"></i>
              </span>
            </label>
            <button class="logout-btn" @click="logout">
              Log out
              <i class="fa-solid fa-right-from-bracket logout-icon"></i>
            </button>

            <transition name="top-slider">
              <div v-if="dropdownOpen" class="top-slider">
                <ModalChangePassword :show="showChangePasswordModal" @close="showChangePasswordModal = false"
                  @change="handlePasswordChange" />
                <button @click="showChangePasswordModal = true" class="changepass-btn">
                  Change Password
                </button>
              </div>
            </transition>
            <!-- Settings Icon - Placér den i bunden -->
            <div class="settings-footer">
              <i :class="{ 'fa-solid fa-gear': !dropdownOpen, 'fa-solid fa-times': dropdownOpen }" class="settings-icon"
                @click="toggleDropdown"></i>


            </div>
          </ul>
        </transition>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed} from 'vue';
import ApiService from '@/services/apiServer';
import { useRouter } from 'vue-router';
import ModalChangePassword from "@/components/Modal_ChangePassword.vue";

const showChangePasswordModal = ref(false);

const router = useRouter();

const isDark = ref(localStorage.getItem('isDarkMode') === 'true');
const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('isDarkMode', isDark.value);
  document.documentElement.setAttribute('color-scheme', isDark.value ? 'dark' : 'light');
};
onMounted(() => {
  document.documentElement.setAttribute('color-scheme', isDark.value ? 'dark' : 'light');
});


const logout = async () => {
  try {
    // Fjern tokenet fra storage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Fjern tokenet fra Axios headers
    ApiService.clearToken();

    // Omdiriger til login-siden
    router.push('/'); // Går tilbage til login-siden
  } catch (error) {
    console.error('Fejl under log-ud:', error);
  }
};

const isAdmin = computed(() => {
  const roleId = localStorage.getItem('roleId') || sessionStorage.getItem('roleId');
  return roleId == 1;
})

const isAdminOrFaculty = computed(() => {
  const roleId = localStorage.getItem('roleId') || sessionStorage.getItem('roleId');
  return roleId == 1 || roleId == 2;
})

const isStudentOrAnyone = computed(() => {
  const roleId = localStorage.getItem('roleId') || sessionStorage.getItem('roleId');
  return roleId == 1 || roleId == 2 || roleId == 3;
})


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

const toggleMobileNav = () => {
  mobileNav.value = !mobileNav.value;
};

const updateScroll = () => {
  scrolledNav.value = window.scrollY > 50;
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
  document.documentElement.style.fontSize = size === 'large' ? '20px' : '15px'; // Skifter mellem stor og normal størrelse
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
    top: 50px;
    /* Just over the settings icon */
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
        background-color: $lightGrey;
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
  color: $dangerRed;

  &:hover {
    opacity: 80%;
  }
}

/* Animation for dropdown */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.3s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 35px;
  margin: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

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
  background-color: $primaryPurple;
  border-radius: 50%;
  transition: 0.4s;
}

/* Ikoner for måne og sol */
.moon-icon,
.sun-icon {
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

input:checked+.slider:before {
  transform: translateX(-40px);
  /* Justeret position til slider-knappen */
}

input:checked+.slider .moon-icon {
  color: $white-color;
}

input:checked+.slider .sun-icon {
  color: $darkGrey;
}

// Nr 2 font-size
.font-size-toggle {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 35px;
  margin: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider-font {
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

.slider-font:before {
  position: absolute;
  content: "";
  height: 35px;
  width: 45px;
  right: 0px;
  bottom: 0px;
  background-color: $darkGrey;
  border-radius: 50%;
  transition: 0.4s;
}

/* Ikoner for måne og sol */
.aa-icon,
.a-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.4s;
}

.aa-icon {
  left: 9px;
  font-size: 20px;
}

.a-icon {
  right: 12px;
  color: $white-color;
  font-size: 15px;
}

input:checked+.slider-font:before {
  transform: translateX(-40px);
  /* Justeret position til slider-knappen */
}

input:checked+.slider-font .aa-icon {
  color: $white-color;
}

input:checked+.slider-font .a-icon {
  color: $darkGrey;
}

.soge-felt {
  margin-left: 20px;
  position: relative;

  input {
    padding: 10px 40px;
    font-size: $font-size-desktop;
    border: none;
    border-radius: 5px;
    background: $lightGrey;
    width: 300px;

    &:focus {
      border-color: $primaryPurple;
      /* Juster farve efter behov */
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
        font-size: $iconsSize;
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
      position: fixed;
      /* Gør det fast, så det altid er på skærmen */
      top: 20px;
      /* Justér afstand fra toppen */
      right: 20px;
      /* Justér afstand fra højre */
      z-index: 105;
      /* Sørg for, at den er over dropdown-menuen */

      i {
        font-size: 25px;
        cursor: pointer;
        transition: transform 0.3s ease, color 0.3s ease;

        &.fa-times {
          color: $primaryPurple; // Valgfri farve til krydset
        }

        &.fa-bars {
          color: $darkGrey;
        }
      }
    }

    .dropdown-nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: 0;
      /* Juster til at være til højre */
      width: 200px;
      height: 100%;
      background-color: $white-color;
      box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
      /* Skab en skygge på venstre side for at indikere sidepanel */
      padding-top: 50px;
      z-index: 100;

      .link {
        font-size: $font-size-mobile;
        text-align: left;
        margin: 15px 0;
        padding-left: 20px;
        width: auto;
        border: none;

        &:hover {
          background-color: $lightGrey;
        }
      }
    }
  }

  // Placering af settings-ikonet
  .settings-footer {
    position: absolute;
    bottom: 20px;
    /* Flytter det til bunden */
    width: 100%;
    text-align: center;

    .settings-icon {
      font-size: 30px;
      cursor: pointer;
      transition: color 0.3s ease;
      color: $darkGrey;

      &:hover {
        color: $primaryPurple;
      }
    }
  }

  // Styling til top-slideren
  .top-slider {
    position: fixed;
    top: 450px;
    /* Skjult til at starte med */
    right: 0;
    /* Juster til at være til højre */
    width: 200px;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .changepass-btn {
      background-color: $primaryPurple;
      color: $white-color;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: darken($primaryPurple, 10%);
      }
    }
  }

  // Animation til top-slideren
  .top-slider-enter-active,
  .top-slider-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .top-slider-enter-from {
    transform: translateX(250px);
  }

  .top-slider-enter-to {
    transform: translateY(0);
  }

  .top-slider-leave-to {
    transform: translateX(250px);
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    @include transition(0.3s);
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: translateX(250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}
</style>