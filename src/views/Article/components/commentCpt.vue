<template>
  <div>
    <van-cell class="vancell">
      <template #icon>
        <div class="img">
          <van-image
            round
            width="0.96rem"
            height="0.96rem"
            :src="comment.aut_photo"
          />
        </div>
      </template>
      <template #title>
        <span>{{ comment.aut_name }}</span>
        <div>
          <van-cell :title="comment.content" class="content">
            <template #label>
              <span>{{ timeformat }}</span>
              <van-button
                type="default"
                size="small"
                round
                @click="$parent.isShowCommentsInfo = true"
                >回复{{ comment.reply_count }}</van-button
              >
            </template>
          </van-cell>
        </div>
      </template>
      <template>
        <span class="toutiao toutiao-dianzan"></span>
        <span>赞</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    timeformat() {
      const { pubdate } = this.comment
      return dayjs(pubdate).fromNow()
    }
  }
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 28px;
}
.vancell {
  display: flex;
  border-bottom: 1px solid #ccc;
  & > .img {
    flex: 1;
  }
  & > .van-cell__title {
    flex: 6;
  }
  & > .van-cell__value {
    flex: 1;
  }
  .van-cell__title {
    & > span {
      color: rgb(70, 107, 157);
    }
    :deep(.van-cell__title) {
      span {
        color: #363636;
        font-size: 24px;
      }
    }
  }
}
:deep(.content) {
  padding: 0 !important;
  .van-cell__label {
    margin-top: 32px;
    width: 300px;
    height: 48px;
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-button {
      width: 165px;
      height: 48px;
    }
  }
}
</style>
