<template>
    <header :class="{ 'scrolled-nav': scrolledNav }">
        <nav>
            <div class="branding">
                <RouterLink to="/">
                    <img src="../img/kubelab.png" alt="Kubelab logo" />
                </RouterLink>
            </div>
            
            <!-- Desktop Navigation -->
            <ul v-show="!mobile" class="navigation1">
                <RouterLink class="link" to="">Project</RouterLink>
                <RouterLink class="link" to="">Templates</RouterLink>
                <RouterLink class="link" to="">Groups</RouterLink>
                <i class="fa-solid fa-gear"></i>
            </ul>

            <!-- Mobile Navigation Icon -->
            <div class="icon">
                <i @click="toggleMobileNav" v-show="mobile" class="fa-solid fa-bars" :class="{ 'icon-active': mobileNav }"></i>
            </div>

            <!-- Mobile Dropdown Navigation -->
            <transition name="mobile-nav">
                <ul v-show="mobileNav" class="dropdown-nav">
                    <RouterLink class="link" to="">Project</RouterLink>
                    <RouterLink class="link" to="">Templates</RouterLink>
                    <RouterLink class="link" to="">Groups</RouterLink>
                </ul>
            </transition>
        </nav>
    </header>
</template>
  
  <script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolledNav = ref(false);
const mobile = ref(false);
const mobileNav = ref(false);
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
header {
    background-color: $white-color;
    z-index: 2;
    padding: 10px;
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
        }

        .link {
            font-size: $font-size-desktop;
            font-weight: $font-weight;
            color: $secondary-color;
            list-style: none;
            text-decoration: none;
            margin-right: 40px;
            @include transition();

            &:hover {
                color: $primary-color;
            }
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