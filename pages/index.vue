<template>
  <main class="main-page">
    <header class="main-page__header">
      <f-tabs :items="filterItems" @change="onFilterChange" />
    </header>
    <f-container>
      <f-cards-placeholder v-if="isNewListFetching" :count="5" />
      <div v-if="isNewListEmpty" class="main-page__empty-message">
        Ничего не найдено
      </div>
      <f-cards-container class="main-page__cards-container" v-else>
        <f-article-card
          v-for="article of articlesList"
          :key="article.id"
          class="main-page__card"
          :data="article"
        />
      </f-cards-container>
      <div v-if="isArticlesNotOver" class="main-page__show-more">
        <a href="#" @click.prevent="fetchMore">
          Загрузить еще
        </a>
      </div>
    </f-container>
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import FTabs from '@/components/FTabs';
import FContainer from '@/components/FContainer';
import FArticleCard from '@/components/FArticleCard';
import FCardsContainer from '@/components/FCardsContainer';
import FCardsPlaceholder from '@/components/FCardsPlaceholder';
import { ARTICLE_TYPES as articleTypes, STORE_MODULES } from '@/constants';

const { mapActions, mapState, mapGetters } = createNamespacedHelpers(
  STORE_MODULES.articles
);

export default {
  name: 'MainPage',
  components: {
    FTabs,
    FContainer,
    FArticleCard,
    FCardsContainer,
    FCardsPlaceholder,
  },
  head() {
    return {
      title: 'Главная страница',
    };
  },
  async fetch({ store }) {
    await store.dispatch(`${STORE_MODULES.articles}/fetchByType`);
  },
  data: () => ({
    filterItems: [
      {
        id: null,
        title: 'Все',
      },
      ...Object.values(articleTypes).map(({ title, value }) => ({
        title,
        id: value,
      })),
    ],
  }),
  methods: {
    ...mapActions(['fetchMore', 'fetchByType']),
    onFilterChange({ id: type }) {
      this.fetchByType({
        type,
      });
    },
  },
  computed: {
    ...mapState({
      articlesList: ({ list }) => list,
      isFetching: ({ isFetching }) => isFetching,
      isArticlesNotOver: ({ isArticlesOver }) => !isArticlesOver,
    }),
    ...mapGetters(['isNewListEmpty', 'isNewListFetching']),
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  &__header {
    margin-bottom: 32px;
  }
  &__empty-message {
    text-align: center;
    padding: 40px 5px;
    font-size: $fs-big;
  }
  &__show-more {
    text-align: center;
    width: 100%;
    justify-self: center;
  }
}
</style>
