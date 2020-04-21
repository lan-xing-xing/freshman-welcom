<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎{{ introduction }}</div>
    <div>
      <img :src="emptyGif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      emptyGif: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570885816321&di=a6bce0340e5ae90047' +
        'ef41d496a90642&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170501%2F34dfb1b2600543d19e1583f933c06654.gif'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'introduction'
    ])
  }
}
</script>

<style lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 150px auto;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
