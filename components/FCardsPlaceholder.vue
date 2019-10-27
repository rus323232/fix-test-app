<template>
  <f-cards-container class="cards-placeholder">
    <content-placeholders
      v-for="i of count"
      :key="i"
      class="cards-placeholder__item"
      :rounded="true"
    >
      <content-placeholders-img />
      <content-placeholders-heading />
      <content-placeholders-text :lines="3" />
    </content-placeholders>
  </f-cards-container>
</template>

<script>
import FCardsContainer from '@/components/FCardsContainer';

export default {
  name: 'FCardPlaceholder',
  components: { FCardsContainer },
  props: {
    count: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.cards-placeholder {
  margin-left: -27px;

  &__item {
    width: 100%;
    max-width: 336px;
    height: 407px;
    margin-left: 27px;
  }
}
</style>
