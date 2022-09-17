<template>
  <div>
    <div class="comments">
      <van-field
        v-model.trim="message"
        rows="2"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <div class="btn" @click="addComments"><span>发布</span></div>
    </div>
  </div>
</template>

<script>
import { addCommentsAPI } from '@/api'
export default {
  name: 'ipt',
  props: {
    comid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async addComments() {
      if (this.message === '') return this.$toast.fail('评论不能为空')
      try {
        this.$parent.$parent.isShowComments = false
        if (this.comid === '') {
          const id = this.$route.query.articleId
          const { data } = await addCommentsAPI(id, this.message)
          console.log(data.data.new_obj)
          this.$emit('update:newObj', data.data.new_obj)
        } else {
          const id = this.comid
          const { data } = await addCommentsAPI(
            id,
            this.message,
            this.$route.query.articleId
          )
          console.log(data.data.new_obj)
          this.$emit('update:newObj', data.data.new_obj)
        }
        this.message = ''
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录后再评论')
        } else if (error.response && error.response.status === 403) {
          this.$toast.fail('该文章不允许评论')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.comments {
  height: 176px;
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  :deep(.van-cell) {
    width: 596px;
    height: 176px;
    background-color: #f5f7f9;
    display: flex;
    .van-field__control {
      min-height: unset;
      &::placeholder {
        color: rgb(110, 119, 129);
      }
    }
    .van-cell__value {
      display: flex;
      flex-direction: column;
    }
  }
  .btn {
    flex: 1;
    display: flex;
    height: 88px;
    align-items: center;
    justify-content: center;
    color: #6ba3d8;
    font-size: 28px;
  }
}
</style>
