<template>
  <div>
    <CommentCpt :comment="comment"></CommentCpt>
    <!-- 评论详情弹出框 -->
    <van-popup
      v-model="isShowCommentsInfo"
      position="bottom"
      :style="{ height: '100%' }"
      ><CommentInfo :comment="comment"></CommentInfo
    ></van-popup>
  </div>
</template>

<script>
import CommentInfo from './commentInfo.vue'
import CommentCpt from './commentCpt.vue'
export default {
  data() {
    return {
      isShowCommentsInfo: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { CommentInfo, CommentCpt }
}
</script>

<style scoped lang="less">

</style>
