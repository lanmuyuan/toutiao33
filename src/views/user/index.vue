<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />
    <!-- 信息修改 -->
    <!-- 头像修改 -->
    <input
      type="file"
      hidden
      ref="file"
      accept=".jpg,.png,.pdf"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avater" />
    </van-cell>
    <!-- 用户昵称修改 -->
    <van-cell
      title="昵称"
      is-link
      :value="Profile.name"
      @click="isShowUserName = true"
    />
    <!-- 用户性别修改 -->
    <van-cell
      title="性别"
      is-link
      :value="Profile.gender ? '女' : '男'"
      @click="isShowSex = true"
    />
    <!-- 生日修改 -->
    <van-cell
      title="生日"
      is-link
      :value="Profile.birthday"
      @click="isShowBirthday = true"
    />
    <!-- 头像弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdataAvater
        :photo="photo"
        v-if="isShowPhoto"
        :avater.sync="avater"
      ></UpdataAvater>
    </van-popup>
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isShowUserName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdataUserName
        :Profile="Profile"
        @editUserName="Profile.name = $event"
      ></UpdataUserName>
    </van-popup>
    <!-- 性别选择弹出层 -->
    <van-popup v-model="isShowSex" position="bottom" :style="{ height: '30%' }">
      <UpdataSex
        :Profile="Profile"
        @editSex="Profile.gender = $event"
      ></UpdataSex>
    </van-popup>
    <!-- 生日选择弹出层 -->
    <van-popup
      v-model="isShowBirthday"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <UpdataBirthday
        :Profile="Profile"
        @editBirthday="Profile.birthday = $event"
      ></UpdataBirthday>
    </van-popup>
  </div>
</template>

<script>
// 1.点击修改头像
// -手动的触发input:file的点击事件
// 2.获取用户选择的图片
// -给input:file绑定change
// 选择的图片被保存在了input:file:value属性上，保存的文件的绝对路径.files数组里，保存的File对象
// File对象，文件的二进制对象
// input:file
// hidden:等于display:none
// accept：规定file选择文件的类型
import { resolveToBase64 } from '@/utils'
import { getUserProfileAPI } from '@/api'
import UpdataAvater from './components/UpdataAvater.vue'
import UpdataUserName from './components/UpdataUserName.vue'
import UpdataSex from './components/UpdataSex.vue'
import UpdataBirthday from './components/UpdataBirthday.vue'
export default {
  data() {
    return {
      isShowPhoto: false,
      isShowUserName: false,
      isShowSex: false,
      isShowBirthday: false,
      photo: '',
      avater: '',
      Profile: {}
    }
  },
  created() {
    this.getUserProfile()
  },
  components: { UpdataAvater, UpdataUserName, UpdataSex, UpdataBirthday },
  methods: {
    async getUserProfile() {
      // 获取用户信息
      try {
        const { data } = await getUserProfileAPI()
        this.Profile = data.data
        this.avater = this.Profile.photo
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('认证失败，请重新登录')
        } else {
          throw error
        }
      }
    },
    async selectPhoto() {
      const file = this.$refs.file.files[0]
      const base64 = await resolveToBase64(file)
      this.photo = base64
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能连续选择同一张图片的bug
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
