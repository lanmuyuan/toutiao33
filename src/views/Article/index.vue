<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.back()" />
    <ArticleContent :article="article"></ArticleContent>
    <!-- 底部功能栏 -->
    <div class="article-bottom">
      <!-- 写评论按钮 -->
      <van-button type="default" round>写评论</van-button>
      <van-icon class-prefix="toutiao" name="wenda" />
      <van-icon
        class-prefix="toutiao"
        name="shoucang"
        :class="{ collection: isCollection }"
        @click="setCollections"
      />
      <van-icon class-prefix="toutiao" name="dianzan" />
      <van-icon class-prefix="toutiao" name="fenxiang" />
    </div>
  </div>
</template>

<script>
import ArticleContent from './components/ArticleContent.vue'
import {
  getArticlesDetailsAPI,
  setCollectionsAPI,
  deleteCollectionsAPI
} from '@/api'
export default {
  components: { ArticleContent },
  data() {
    return {
      article: {},
      isCollection: ''
    }
  },
  created() {
    this.getArticlesDetails()
  },
  methods: {
    // 点击收藏按钮
    async setCollections() {
      // 如果为未收藏状态
      if (!this.isCollection) {
        try {
          await setCollectionsAPI(this.$route.query.articleId)
          this.isCollection = true
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.$toast.fail('操作失败')
          } else {
            throw error
          }
        }
        // 如果为收藏状态
      } else {
        try {
          await deleteCollectionsAPI(this.$route.query.articleId)
          this.isCollection = false
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.$toast.fail('操作失败')
          } else {
            throw error
          }
        }
      }
    },
    // 获取文章详情
    async getArticlesDetails() {
      const id = this.$route.query.articleId
      try {
        const { data } = await getArticlesDetailsAPI(id)
        console.log(data)
        this.article = data.data
        this.isCollection = data.data.is_collected
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.$toast.fail('文章不存在')
          this.$router.back()
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-bottom {
  height: 88px;
  border-top: 1px solid #bbb;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-button {
    width: 282px;
    height: 46px;
    color: #a7a7a7;
  }
  .toutiao {
    font-size: 40px;
  }
}
.collection {
  color: rgb(255, 150, 50);
}
</style>
