<template>
  <component :is="tag" class="container">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'FContainer',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: $cs-large;
  box-sizing: border-box;
  @include media-small-desktop {
    max-width: $cs-medium;
    padding: 0 10px;
  }
  @include media-phone {
    max-width: $cs-small;
  }
}
</style>
