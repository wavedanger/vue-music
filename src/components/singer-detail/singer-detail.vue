<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    <!-- <div class="singer-detail"></div> -->
  </transition>
</template>
<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
import {getSingerDetail, getMusic} from 'api/singer'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'
import MusicList from 'components/music-list/music-list'
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
    // console.log(this.singer)
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normallizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normallizeSongs(list) {
      let ret = [] // 返回值
      list.forEach((item) => {
        let {musicData} = item // 得到music对象
        // console.log(musicData)
        // createSong必传两个参数
        if (musicData.songid && musicData.albummid) {
          // console.log(getMusic(musicData.songmid))
          getMusic(musicData.songmid).then((res) => {
            // console.log(res)
            if (res.code === ERR_OK) {
              // console.log(res.data)
              const svkey = res.data.items
              const songVkey = svkey[0].vkey
              // const songVkey = res.req_0.data.midurlinfo[0].vkey
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
            }
          })
        }
      })
      // console.log(ret)
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

// .singer-detail {
// position: fixed;
// z-index: 100;
// top: 0;
// left: 0;
// right: 0;
// bottom: 0;
// background: $color-background;
// }
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0); // 100% 完全移动到屏幕右侧 动画开始后向左滑入
}
</style>