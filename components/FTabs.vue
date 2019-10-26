<template>
  <div class="tabs">
    <f-container class="tabs__container">
      <ul class="tabs__list">
        <li
          v-for="(item, index) of items"
          :key="item.id"
          class="tabs__item"
          :class="{
            'tabs__item--active': index === activeTabIndex,
          }"
          @click="onTabClick(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </f-container>
  </div>
</template>

<script>
import FContainer from '@/components/FContainer';

export default {
  name: 'FTabs',
  components: {
    FContainer,
  },
  props: {
    /**
     * [{ id: string, title: string }]
     * */
    items: {
      type: Array,
      required: true,
    },
    initialTabIndex: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      activeTabIndex: this.initialTabIndex,
    }
  },
  methods: {
    onTabClick(item, index) {
      this.activeTabIndex = index;
      this.$emit('change', item)
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  @include flex-row;
  align-items: center;
  border-bottom: 1px $c-light-grey solid;
  width: 100%;
  &__container {
    height: 100%;
  }
  &__list {
    @include flex-row;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  &__item {
    @include flex-row;
    height: 100%;
    color: $c-grey;
    align-items: center;
    padding: 20px 25px;
    border-bottom: 4px transparent solid;
    cursor: pointer;
  }
  &__item--active {
    color: $c-grey;
    border-bottom: 4px $c-blue solid;
  }
}
</style>
