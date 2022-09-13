<template>
  <div class="article">
    <!--属性-->
    <!--@Load:触底的时候触发Load事件-->
    <!--offset:滚动条和底部距离多少的时候触发Load事件，默认值是300px-->
    <!--immediate-check:初渲染的时候是否执行oad事件，默认值是true-->
    <!--v-modeL="Loading”-->
    <!--Loading为true,load事件不会被触发-->
    <!--Loading.为时alse的时候，Load事件会被触发-->
    <!--Loading会在Load事件执行后，被van-List组件自动设置为ture,需要手动的改为时alse-)
    <!-finished:BooLean.false:load事件会被触发true:load事件不会被出发了，并且显寸inished-.text的文-->
    <van-pull-refresh v-model="refreshing" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        :immediate-check="false"
        offset="100"
        :finished="finished"
        finished-text="------我是有底线的------"
        :error.sync="error"
        error-text="请求失败，点击重新刷新"
      >
        <ArticleItem
          v-for="item in Articles"
          :key="item.art_id"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
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
      Articles: [],
      preTimeStamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getArticlesAPIList()
  },
  methods: {
    async getNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 发送请求
        const { data } = await getArticlesAPI(this.id, this.preTimeStamp)
        // 获得的数据添加到数组里
        // 更新时间戳
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.loading) {
          this.Articles.push(...data.data.results)
        } else {
          this.Articles.unshift(...data.data.results)
        }
        this.preTimeStamp = data.data.pre_timestamp
        // 更改loading
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },
    async getArticlesAPIList() {
      // js的错误,原封不动上抛.507原封不动上抛.400上抛中文，
      try {
        // 发送请求
        const { data } = await getArticlesAPI(this.id, +new Date())
        this.Articles = data.data.results
        this.preTimeStamp = data.data.pre_timestamp
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

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
