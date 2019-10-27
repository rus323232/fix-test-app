<template>
  <figure class="article-card">
    <div class="article-card__image-holder">
      <img class="article-card__image" :src="data.image" alt="">
    </div>
    <figcaption class="article-card__content">
      <div class="article-card__head">
        <div class="article-card__type">
          {{ data.type }}
        </div>
        <div class="article-card__date">
          {{ data.createdAt | formatDate }}
        </div>
      </div>
      <h3 class="article-card__title">{{ data.title }}</h3>
      <p class="article-card__text">{{ data.shortText }}</p>
      <div class="article-card__bottom">
        <a class="article-card__link" href="">Читать далее</a>
        <span class="article-card__views">{{ data.views | spliceByBits }}</span>
      </div>
    </figcaption>
  </figure>
</template>

<script>
import { formatDate, spliceByBits } from '@/utils';

export default {
  name: 'FArticleCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formatDate,
    spliceByBits,
  },
};
</script>

<style lang="scss" scoped>
.article-card {
  margin: 0;
  width: 100%;
  max-width: 336px;
  height: 407px;
  &__image-holder {
    width: 100%;
    height: 159px;
    text-align: center;
    overflow: hidden;
    background-color: $c-light-grey;
  }
  &__image {
    display: inline-block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &__info {
    @include flex-row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
