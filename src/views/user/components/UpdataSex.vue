<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$parent.$parent.isShowSex = false"
      :default-index="Profile.gender"
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
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm(value, index) {
      this.$parent.$parent.isShowSex = false
      try {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '更改中...'
        })
        await editUserProfileAPI({ gender: index })
        this.$toast.success('更新性别成功')
        this.$emit('editSex', index)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('认证失败，请重新登录')
        } else {
          throw error
        }
      }
    },
    onCancel() {
      // Toast('取消')
    }
  }
}
</script>

<style></style>
