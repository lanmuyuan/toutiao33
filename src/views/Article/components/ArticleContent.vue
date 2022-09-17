<template>
  <div class="articleContent">
    <!-- 文章标题 -->
    <van-cell :title="article.title" class="vanCell" center />
    <!-- 作者栏 -->
    <van-cell
      :title="article.aut_name"
      :label="article.pubdate"
      center
      class="authorCell"
    >
      <template
        ><van-button round type="info" size="small" class="btn" icon="plus"
          >关注</van-button
        ></template
      >
      <template #icon>
        <van-image round width="1rem" height="1rem" :src="article.aut_photo" />
      </template>
    </van-cell>
    <div v-html="article.content" class="content"></div>
    <van-divider>正文结束</van-divider>
    <van-list :finished="true" finished-text="没有更多了" class="list">
      <CommentsItem
        :comment="item"
        v-for="item in commentsList"
        :key="item.com_id"
      ></CommentsItem>
    </van-list>
  </div>
</template>

<script>
import CommentsItem from './CommentsItem.vue'
import { getCommentsAPI } from '@/api'
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    newObj: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentsItem
  },
  data() {
    return {
      commentsList: []
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async getComments() {
      try {
        const { data } = await getCommentsAPI(
          'a',
          this.$route.query.articleId,
          null,
          10
        )
        console.log(data)
        this.commentsList = data.data.results
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail('获取评论参数错误')
        } else {
          throw error
        }
      }
    }
  },
  watch: {
    newObj: {
      handler(newValue) {
        console.log(newValue)
        this.commentsList.unshift(newValue)
      }
    }
  }
}
</script>

<style scoped lang="less">
.articleContent {
  height: calc(100vh - 92px - 88px);
  overflow: auto;
}
.vanCell {
  height: 152px;
  border-bottom: 1px solid #333;
  .van-cell__title {
    color: #3a3a3a;
    font-size: 40px;
    font-weight: 700;
  }
}
.authorCell {
  font-size: 24px;
  padding-top: 0;
  padding-bottom: 0;
  .van-image {
    margin-right: 20px;
  }
  .van-cell__label {
    margin-top: 0;
  }
}
.btn {
  width: 170px;
  height: 58px;
}
:deep(.content) {
  padding: 52px 32px;
  .heading {
    font-size: 64px;
    margin-top: 0.64rem;
    margin-bottom: 0.42667rem;
    font-weight: 600;
    line-height: 1.25;
    padding-bottom: 0.3em;
    border-bottom: 0.02667rem solid #d8dee4;
  }
  p {
    text-align: justify;
    -webkit-text-size-adjust: 100%;
    margin: 0;
    color: #24292f;
    background-color: #fff;
    font-size: 0.42667rem;
    line-height: 1.5;
    word-wrap: break-word;
    margin-bottom: 0.42667rem;
  }
  blockquote {
    margin: 0;
    margin-bottom: 0.42667rem;
    padding: 0 1em;
    color: #57606a;
    border-left: 0.25em solid #d0d7de;
  }
  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(175, 184, 193, 0.2);
    border-radius: 0.16rem;
  }
  pre {
    padding: 0.42667rem;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 0.16rem;
    code {
      display: inline;
      max-width: auto;
      padding: 0;
      margin: 0;
      overflow: visible;
      line-height: inherit;
      word-wrap: normal;
      background-color: transparent;
      border: 0;
      font-size: 27px;
    }
  }
}
.list {
  margin-bottom: 0.6rem;
}
</style>
