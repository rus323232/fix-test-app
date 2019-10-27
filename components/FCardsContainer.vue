<template>
  <div class="cards-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FCardsContainer',
};
</script>

<style lang="scss" scoped>
.cards-container {
  @include flex-row-wrap;
  padding: 0 40px;
}
</style>
