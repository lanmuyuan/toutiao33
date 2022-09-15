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
import UpdataAvater from './components/UpdataAvater.vue'
import { resolveToBase64 } from '@/utils'
export default {
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avater: ''
    }
  },
  components: { UpdataAvater },
  methods: {
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
