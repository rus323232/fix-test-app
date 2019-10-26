<template>
  <section class="main-page">
    <f-tabs :items="filterItems" @change="onFilterChange" />
    <f-container>
      ss
    </f-container>
  </section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import FTabs from '@/components/FTabs';
import FContainer from '@/components/FContainer';
import { ARTICLE_TYPES as articleTypes, STORE_MODULES } from '@/constants';

const { mapActions, mapState } = createNamespacedHelpers(STORE_MODULES.articles);

export default {
  components: {
    FTabs,
    FContainer,
  },
  head() {
    return {
      title: 'Главная страница',
    };
  },
  data: () => ({
    filterItems: [
      {
        id: null,
        title: 'Все',
      },
      ...articleTypes.map(({ title, value }) => ({
        title,
        id: value,
      })),
    ],
    ...mapState({
      atriclesList: ({ list }) => list,
      isFetching: ({ isFetching }) => isFetching,
    })
  }),
  methods: {
    ...mapActions([
      'fetchByType',
    ]),
    onFilterChange({ id: type }) {
      this.fetchByType({
        type,
      });
    },
  },
};
</script>
