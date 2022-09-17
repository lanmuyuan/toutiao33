<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirm"
      @cancel="$parent.$parent.isShowBirthday = false"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(...this.format(this.Profile.birthday))
    }
  },
  methods: {
    async confirm(value) {
      this.$parent.$parent.isShowBirthday = false
      try {
        const timeData = dayjs(value).format('YYYY-MM-DD')
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '更改中...'
        })
        await editUserProfileAPI({ birthday: timeData })
        this.$toast.success('更新生日成功')
        this.$emit('editBirthday', timeData)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('认证失败，请重新登录')
        } else {
          throw error
        }
      }
    },
    format(timeStr) {
      const timeArr = timeStr.split('-')
      timeArr[1]--
      return timeArr
    }
  }
}
</script>

<style></style>
