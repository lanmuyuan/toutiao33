<template>
  <div>
    <van-nav-bar class="nav-bar">
      <template #title>
        <van-button icon="search" size="small" block round>搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :myChannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @del_Channel="delChannel"
        @add_Channel="addChannel"
        v-if="isShow"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, dellChannelAPI, addChannelAPI } from '@/api'
import { mapGetters, mapMutations } from 'vuex'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  created() {
    this.initChannels()
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  methods: {
    // 1.??==>相当于||，常用于语句
    // 2.?.=>可选链操价符，？前面是undifined,那么不会往后取值
    initChannels() {
      if (this.isLogin) {
        this.getChannelsLsit()
      } else {
        if (this.$store.state.myChannels.length === 0) {
          this.getChannelsLsit()
        } else {
          this.channels = this.$store.state.myChannels
        }
      }
    },
    async getChannelsLsit() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    async delChannel(id) {
      try {
        const newChannels = this.channels.filter((item) => {
          return item.id !== id
        })
        if (this.isLogin) {
          await dellChannelAPI(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }
        this.channels = newChannels
      } catch (error) {
        if (error.response || error.response.status === 401) {
          this.$toast.fail('请先登录再删除')
        } else {
          throw error
        }
      }
    },
    async addChannel(item) {
      try {
        if (this.isLogin) {
          await addChannelAPI(item.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, item])
        }
        this.channels.push(item)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response || error.response.status === 401) {
          this.$toast.fail('请先登录再添加')
        } else {
          throw error
        }
      }
    },
    ...mapMutations(['SET_MY_CHANNELS'])
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
