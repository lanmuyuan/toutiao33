<template>
  <div>
    <div class="main">
      <!-- 标题 -->
      <van-nav-bar
        title="暂无回复"
        left-arrow
        @click-left="$parent.$parent.isShowCommentsInfo = false"
      />
      <!-- 点开的评论 -->
      <CommentCpt :comment="comment"></CommentCpt>
      <!-- 分割线 -->
      <van-divider>全部回复</van-divider>
      <!-- 回复列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :immediate-check="false"
        :error.sync="error"
        error-text="请求失败，点击重新刷新"
        finished-text="没有更多了"
        @load="getNextPageComments"
        offset="100"
      >
        <CommentCpt
          v-for="item in commentsList"
          :key="item.com_id"
          :comment="item"
        ></CommentCpt>
      </van-list>
    </div>
    <!-- 发布按钮 -->
    <van-button type="default" class="btn" @click="isShowComments = true"
      >发布评论</van-button
    >
    <!-- 输入框弹出层 -->
    <van-popup
      v-model="isShowComments"
      position="bottom"
      :style="{ height: '18%' }"
    >
      <CommentsIpt :comid="comment.com_id" :newObj.sync="newObj"></CommentsIpt>
    </van-popup>
  </div>
</template>

<script>
import CommentCpt from './commentCpt.vue'
import { getCommentsAPI, addCommentsAPI } from '@/api'
import CommentsIpt from '@/components/commentsIpt.vue'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { CommentCpt, CommentsIpt },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      commentsList: [],
      last_id: '',
      isShowComments: false,
      newObj: {}
    }
  },
  created() {
    this.getComments()
  },
  methods: {
    async addComments() {
      const { data } = await addCommentsAPI()
      console.log(data)
    },
    async getComments() {
      try {
        const { data } = await getCommentsAPI(
          'c',
          this.comment.com_id,
          null,
          10
        )
        this.commentsList = [...this.commentsList, ...data.data.results]
        this.last_id = data.last_id
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
    },
    async getNextPageComments() {
      try {
        const offset = this.commentsList[this.commentsList.length - 1].com_id

        const { data } = await getCommentsAPI(
          'c',
          this.comment.com_id,
          offset,
          10
        )
        if (!data.data.results.length) {
          this.finished = true
        }
        this.commentsList = [...this.commentsList, ...data.data.results]
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      } finally {
        this.loading = false
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
.btn {
  width: 100%;
}
.main {
  height: calc(100vh - 88px);
  overflow: auto;
}
</style>
