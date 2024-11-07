<script setup>
import InlineSvg from 'vue-inline-svg';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  huge: {
    type: Boolean,
    required: false
  },
  medium: {
    type: Boolean,
    required: false
  },
  small: {
    type: Boolean,
    required: false
  },
})

const filePath = computed(() => {
  return `/icons/${props.name}.svg`;
});
</script>

<template>
  <InlineSvg
      :props="{
        src: filePath,
        title: props.name,
        keepDuringLoading: true,
      }"
      :src="filePath"
      :class="{'small': props.small, 'medium': props.medium, 'huge': props.huge}"
  />
</template>

<style scoped lang="scss">
svg {
  display: inline-block;
  width: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;

  &.huge {
    width: 2rem;
    min-width: 2rem;
    min-height: 2rem;
  }

  &.medium {
    width: 1.25rem;
    min-width: 1.25rem;
    min-height: 1.25rem;
  }

  &.small {
    width: 1rem;
    min-width: 1rem;
    min-height: 1rem;
  }
}
</style>