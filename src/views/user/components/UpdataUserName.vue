<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="$parent.$parent.isShowUserName = false"
      @click-right="onSave"
    />
    <!-- 昵称输入框 -->
    <van-field
      v-model="userName"
      maxlength="11"
      show-word-limit
      placeholder="请输入新的昵称"
    />
  </div>
</template>

<script>
import { editUserProfileAPI } from '@/api'
export default {
  props: {
    Profile: {
      type: Object,
      required: true
    }
  },
  created() {
    this.userName = this.Profile.name
  },
  data() {
    return {
      userName: ''
    }
  },
  methods: {
    async onSave() {
      this.$parent.$parent.isShowUserName = false
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '更改中...'
        })
        await editUserProfileAPI({ name: this.userName })
        this.$toast.success('更新用户名成功')
        this.$emit('editUserName', this.userName)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style></style>
