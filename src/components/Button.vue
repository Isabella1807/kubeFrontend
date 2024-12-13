<script setup>

import Icon from "@/components/Icon.vue";

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  hollow: {
    type: Boolean,
    required: false
  },
  danger: {
    type: Boolean,
    required: false
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="buttonContainer">
    <div class="buttonShape" :class="{ 'hollow': props.hollow, 'danger': props.danger }">
      <div class="iconContainer">
        <Icon v-if="props.icon" :name="props.icon" />
      </div>
      <p class="buttonText">{{ props.text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.buttonShape {
  display: inline-flex;
  background-color: $primaryPurple;
  border-radius: 10px;
  padding: 0.5rem 2rem 0.5rem 1.7rem;
  justify-content: center;
  align-items: center;
  color: $white-color;
  gap: 0.6rem;
  border: 3px solid $primaryPurple;
  cursor: pointer;
  white-space: nowrap;

  .iconContainer {
    display: flex;
  }

  p {
    color: $white-color;
  }

  &.hollow {
    border: 3px solid $primaryPurple;
    background-color: transparent;
    color: $primaryPurple;

    p {
      color: $primaryPurple;
    }
  }

  &.danger {
    background-color: transparent;
    border: 3px solid $dangerRed;
    color: $dangerRed;
    font-weight: 700;

    p {
      color: $dangerRed;

    }
  }
}

@include mediumScreenOrSmaller {
  .buttonShape {
    padding: 0.3rem 1.3rem 0.3rem 1rem;
  }

  .buttonText {
    font-size: $font-size-mobile;
  }
}

@include smallScreen {
  .buttonShape {
    padding: 0.3rem 1rem 0.3rem 1rem;

    &.danger {
      padding: 0.3rem 1rem 0.3rem 1rem;
    }
  }

  .buttonText {
    display: none;
  }
}
</style>