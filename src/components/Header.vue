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
                <RouterLink class="link" to="/" active-class="active-link">Project</RouterLink>
                <RouterLink class="link" to="/templates" active-class="active-link">Templates</RouterLink>
                <RouterLink class="link" to="/groups" active-class="active-link">Groups</RouterLink>
                    <label class="switch">
                        <input type="checkbox" v-model="isDark" @click="toggleDark()">
                        <span class="slider round">
                            <i class="fa-solid fa-moon moon-icon"></i>
                            <i class="fa-solid fa-sun sun-icon"></i>
                        </span>
                    </label>

                <i class="fa-solid fa-gear settings"></i>
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
                    <input type="checkbox" v-model="isDark" @click="toggleDark()">
                        <span class="slider round">
                            <i class="fa-solid fa-moon moon-icon"></i>
                            <i class="fa-solid fa-sun sun-icon"></i>
                        </span>
                    </label>

                <i class="fa-solid fa-gear settings"></i>
                </ul>
            </transition>
        </nav>
    </header>
</template>

  
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

// Læs dark mode-præference fra localStorage
const isDark = ref(localStorage.getItem('isDarkMode') === 'true');

// Funktion til at skifte dark mode og gemme indstillingen i localStorage
const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('isDarkMode', isDark.value);
  document.documentElement.setAttribute('color-scheme', isDark.value ? 'dark' : 'light');
};

// Genindlæs farveskema ved sideindlæsning
onMounted(() => {
  document.documentElement.setAttribute('color-scheme', isDark.value ? 'dark' : 'light');
});



const scrolledNav = ref(false);
const mobile = ref(false);
const mobileNav = ref(false);
const searchQuery = ref('');
const windowWidth = ref(window.innerWidth);

// Funktion til at tjekke skærmbredden
const checkScreen = () => {
    windowWidth.value = window.innerWidth;
    if (windowWidth.value <= 768) {
        mobile.value = true;
    } else {
        mobile.value = false;
        mobileNav.value = false; // Luk mobile navigation, når skærmen er bredere end 768px
    }
};

// Funktion til at opdatere scroll-status
const updateScroll = () => {
    const scrollPosition = window.scrollY;
    scrolledNav.value = scrollPosition > 50;
};

// Funktion til at skifte mobile navigation
const toggleMobileNav = () => {
    mobileNav.value = !mobileNav.value;
};

// Søgefunktion
const searchItems = () => {
    console.log('Søger efter: ', searchQuery.value);
    // Her kan du implementere søgning via API eller filtrering af lokale data
};

// Setup event listeners
onMounted(() => {
    window.addEventListener('resize', checkScreen);
    window.addEventListener('scroll', updateScroll);
    checkScreen();
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
    window.removeEventListener('scroll', updateScroll);
});
</script>

  <style lang="scss" scoped>

// Variabler
$primary-color: #5C007E;
$secondary-color: #333;
$white-color: #fff;
$bacgroundgrey: #F6F6F6;
$color-darkmode: #fff;
$darkmode-bg: #2D003E;
$darkmode-lilla:#e8aaff;
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


/* Farveskema Darkmode */
[color-scheme='dark'] {
  
  header {
    background-color: $darkmode-bg /* Baggrundsfarve for dark mode */
  }

  .navigation1{

     .settings {
    color: $color-darkmode;
    @include transition();

        &:hover {
            color: $darkmode-lilla;
        }
    }
  }
   

  .active-link {
            border-bottom: 3px solid $color-darkmode;
        }

  .link {
    color: $color-darkmode;
    @include transition();

    &:hover {
      color: $darkmode-lilla;
    }
  }
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