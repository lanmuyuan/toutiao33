<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon
          name="delete-o"
          v-if="!isEdit"
          @click="isEdit = true"
        ></van-icon>
        <div v-else>
          <span @click="SET_HISTORIES([])">全部删除</span>&nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="item in histories"
      :key="item"
      @click="!isEdit && $emit('change_keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEdit"
          @click="SET_HISTORIES(histories.filter((i) => i !== item))"
        ></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  },
  methods: {
    ...mapMutations(['SET_HISTORIES'])
  }
}
</script>

<style></style>
