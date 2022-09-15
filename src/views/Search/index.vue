<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="$router.push('/')"
        @focus="isShowSearchResults = false"
      />
    </form>
    <component
      :is="componentName"
      :keywords="keywords"
      @change_keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  components: { SearchHistory, SearchSuggestion, SearchResult },
  data() {
    return {
      keywords: '',
      isShowSearchResults: false
    }
  },
  computed: {
    componentName() {
      // 搜索历史：搜素框的值空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：触发搜索时显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults === false) {
        return 'SearchSuggestion'
      }
      return 'SearchResult'
    },
    ...mapState(['histories'])
  },
  methods: {
    onSearch(keywords) {
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSearchResults = true
    },
    ...mapMutations(['SET_HISTORIES'])
  }
}
</script>

<style scoped lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
