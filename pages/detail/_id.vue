<template>
  <main class="about-page">
    <f-container>
      <div class="about-page__back">
        <nuxt-link to="/">Назад</nuxt-link>
      </div>
      <article>
        <h1>{{ title }}</h1>
        <div class="about-page__img-holder">
          <img class="about-page__img" :src="image" :alt="title" />
        </div>
        <div class="about-page__info">
          <div>{{ createdAt | formatDate }}</div>
          <div class="about-page__views">
            <f-eye-icon class="about-page__eye" />{{ views | splitByBits }}
          </div>
        </div>
        <p>{{ fullText }}</p>
      </article>
    </f-container>
  </main>
</template>

<script>
import { STORE_MODULES } from '@/constants';
import FEyeIcon from '@/components/FEyeIcon';
import FContainer from '@/components/FContainer';
import { formatDate, splitByBits } from '@/utils';

export default {
  name: 'AboutPage',
  components: {
    FEyeIcon,
    FContainer,
  },
  async asyncData({ params, error, store }) {
    try {
      const { image, title, fullText, views, createdAt } = await store.dispatch(
        `${STORE_MODULES.articles}/fetchDetail`,
        {
          id: params.id,
        }
      );

      return {
        image,
        title,
        views,
        fullText,
        createdAt,
      };
    } catch (e) {
      error({ statusCode: 404, message: 'Статья не найдена' });
    }
  },
  head() {
    return {
      title: this.title,
    };
  },
  filters: {
    formatDate,
    splitByBits,
  },
};
</script>

<style lang="scss" scoped>
.about-page {
  &__back {
    width: 100%;
    text-align: center;
    padding: 20px 0;
  }
  &__img-holder {
    text-align: center;
    margin-bottom: 20px;
    min-height: 320px;
    max-width: 100%;
    overflow: hidden;
  }
  &__img {
    object-fit: cover;
  }
  &__info {
    @include flex-row;
    justify-content: space-between;
    align-items: center;
  }
  &__views {
    @include flex-row;
  }
  &__eye {
    overflow: hidden;
    margin-right: 10px;
    width: 22px;
    height: 18px;
  }
}
</style>
