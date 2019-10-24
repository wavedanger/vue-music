<template>
 <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
          ref="suggest">
      <ul class="suggest-list">
            <li class="suggest-item" @click="selectItem(item)" v-for="(item, index) in result" :key="index">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length && showSuggest">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import {getSearch} from 'api/search'
import {ERR_OK} from 'api/config'
import {getMusic} from 'api/singer'
import {createSong} from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'
const perpage = 20
const TYPE_SINGER = 'singer'
export default{
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true,
      showSuggest: false// 解决网速问题造成的歌曲找不到而出现提示界面
    }
  },
  methods: {
    search() {
      this.page = 1
      this.hasMore = true
      this.result = []
      this.showSuggest = false
      this.$refs.suggest.scrollTo(0, 0)
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {
        // console.log(res)
        if (res.code === ERR_OK) {
          // this.result = this._getResult(res.data)
          this._getResult(res.data, (ret) => {
            // console.log(ret)
            this.result = ret
            // console.log(this.result)
          })
          this._checkMore(res.data)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          // this.result = this.result.concat(this._getResult(res.data))
          this._getResult(res.data, (ret) => {
            this.result = this.result.concat(ret.slice(1)) // 把新搜索到的数据拼接到之前搜索到的数据中
          })
          this._checkMore(res.data)
        }
      })
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    refresh() {
      this.$refs.suggest.refresh()
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _checkMore(data) {
      const song = data.song
      // console.log(song)
      // 当前页数乘以每页数量 加上 每页加载数量 如果大于等于数据的总数量,则表示下一页已无数据
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    },
    _getResult(data, callback) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        // 使用es6对象扩展运算符...把两个对象添加到一个对象上
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        // ret = ret.concat(data.song.list)// 合并时出现难题
        // ret = ret.concat(this._normalizeSongs(data.song.list))
        this._normalizeSongs(data.song.list, (retdata) => {
          ret = ret.concat(retdata)
          callback && callback(ret)
        })
      }
    },
    _normalizeSongs(list, callback) {
      if (!list) {
        return
      }
      let ret = []
      let index = 1
      list.forEach((musicData) => {
        if (musicData.songid) {
          let promise = getMusic(musicData.songmid)
          // ret.push(createSong(musicData))
          promise.then((res) => {
            // console.log(res)
            if (res.code === ERR_OK) {
              // console.log(res.data)
              const svkey = res.data.items
              const songVkey = svkey[0].vkey
              // const songVkey = res.req_0.data.midurlinfo[0].vkey
              const newSong = createSong(musicData, songVkey)
              ret.push(newSong)
              if (index === list.length) {
                callback && callback(ret)
              }
              index++
            }
          })
        }
      })
    },
    noResult() {
      setTimeout(() => {
        this.showSuggest = true
      }, 1000)// 解决网速问题造成的歌曲找不到而出现提示界面
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.search()
      this.noResult()
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>