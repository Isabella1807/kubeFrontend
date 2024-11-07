<script setup>
import Icon from "@/components/Icon.vue";

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  large: {
    type: Boolean,
    required: false
  },
  ghost: {
    type: Boolean,
    required: false
  },
  primary:{
    type: Boolean,
    required: false
  }
})
</script>

<template>
<div class="buttonContainer">
  <div class="buttonShape" :class="{'large': props.large, 'ghost': props.ghost, 'primary': props.primary}">
    <Icon :name="props.icon" :huge="props.large"/>
  </div>
</div>
</template>

<style scoped lang="scss">
.buttonShape{
  background-color: $darkGrey;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  user-select: none;

  &.large{
    width: 4rem;
    height: 4rem;
  }

  &.ghost{
    background-color: transparent;
  }

  &.primary{
    background-color: $primaryPurple;
  }
}
</style>