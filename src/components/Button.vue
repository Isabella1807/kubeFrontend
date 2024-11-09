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
    <div class="buttonShape" :class="{'hollow': props.hollow, 'danger': props.danger}">
      <Icon v-if="props.icon" :name="props.icon"/>
      <p>{{ props.text }}</p>
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
  color: white;
  gap: 0.6rem;
  font-weight: 500;

  p {
    color: white;
  }

  &.hollow {
    border: 3px solid $primaryPurple;
    background-color: transparent;
    color: $primaryPurple;
    font-weight: 700;

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
</style>