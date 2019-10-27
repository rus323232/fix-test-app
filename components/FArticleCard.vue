<template>
  <figure class="article-card">
    <div class="article-card__image-holder">
      <img class="article-card__image" :src="data.image" :alt="data.title" />
    </div>
    <figcaption class="article-card__content">
      <div class="article-card__top">
        <div
          class="article-card__type"
          :class="`article-card__type--${typeColor}`"
        >
          {{ articleTypeTitle }}
        </div>
        <div class="article-card__date">
          {{ data.createdAt | formatDate }}
        </div>
      </div>
      <div class="article-card__main">
        <h3 class="article-card__title">{{ data.title }}</h3>
        <p class="article-card__text">{{ data.shortText }}</p>
      </div>
      <div class="article-card__bottom">
        <nuxt-link class="article-card__link" :to="`/detail/${data.id}`">
          Читать далее
        </nuxt-link>
        <span class="article-card__views">
          <f-eye-icon class="article-card__views-icon" />
          {{ data.views | splitByBits }}</span
        >
      </div>
    </figcaption>
  </figure>
</template>

<script>
import { ARTICLE_TYPES } from '@/constants';
import FEyeIcon from '@/components/FEyeIcon';
import { formatDate, splitByBits } from '@/utils';

export default {
  name: 'FArticleCard',
  components: { FEyeIcon },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  filters: {
    formatDate,
    splitByBits,
  },
  computed: {
    typeColor() {
      const { type } = this.data;
      const colorsMap = {
        stock: 'red',
        news: 'blue',
        blog: 'green',
      };
      return colorsMap.hasOwnProperty(type) ? colorsMap[type] : 'blue';
    },
    articleTypeTitle() {
      const { type } = this.data;

      return ARTICLE_TYPES[type] ? ARTICLE_TYPES[type].title : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-card {
  @include flex-col;
  box-sizing: border-box;
  justify-content: flex-start;
  margin: 0;
  width: 100%;
  max-width: 336px;
  height: 407px;
  border: 1px $c-light-grey solid;
  color: $c-grey;
  &__image-holder {
    flex-shrink: 0;
    width: 100%;
    height: 159px;
    text-align: center;
    overflow: hidden;
    background-color: $c-light-grey;
  }
  &__date,
  &__views {
    font-size: $fs-small;
  }
  &__content {
    @include flex-col;
    height: 100%;
    justify-content: flex-start;
    padding: 17px 21px;
  }
  &__image {
    display: inline-block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &__title {
    font-family: $ff-regular;
    font-weight: normal;
    color: $c-primary;
    font-size: $fs-big;
    margin: 0 0 10px 0;
  }
  &__main {
    flex: 1;
    overflow: hidden;
  }
  &__top,
  &__bottom {
    @include flex-row;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
  &__top {
    margin-bottom: 15px;
  }
  &__bottom {
    margin-top: auto;
    padding-top: 20px;
  }
  &__bottom:before {
    content: '';
    position: absolute;
    left: 0;
    top: -22px;
    display: block;
    width: 100%;
    height: 23px;
    background: linear-gradient(
      0deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0.72) 100%,
      rgba(255, 255, 255, 0.0001) 100%
    );
  }
  &__views {
    @include flex-row;
    align-items: center;
  }
  &__views-icon {
    width: 14px;
    height: 14px;
    overflow: hidden;
    margin-right: 5px;
  }
  &__type {
    font-size: $fs-smallest;
    text-transform: uppercase;
    border-radius: 20px;
    text-align: center;
    padding: 7px 18px;
  }
  &__type--green {
    color: $c-green;
    background-color: $c-green-light;
  }
  &__type--red {
    color: $c-red;
    background-color: $c-red-light;
  }
  &__type--blue {
    color: $c-blue;
    background-color: $c-blue-light;
  }
}
</style>
