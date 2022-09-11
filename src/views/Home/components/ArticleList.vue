<template>
  <div>
    <ArticleItem
      v-for="item in Articles"
      :key="item.art_id"
      :article="item"
    ></ArticleItem>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      Articles: []
    }
  },
  created() {
    this.getArticlesAPIList()
  },
  methods: {
    async getArticlesAPIList() {
      // js的错误,原封不动上抛.507原封不动上抛.400上抛中文，
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        this.Articles = data.data.results
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
