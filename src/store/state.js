import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'
const state = {
  singer: {},
  playing: false, // 播放状态
  fullScreen: false, // 播放器展开方式：全屏或收起
  playlist: [], // 播放列表（随机模式下与顺序列表不同）
  sequenceList: [], // 顺序播放列表
  mode: playMode.sequence, // 播放模式: 顺序、循环、随机
  currentIndex: -1, // 当前播放歌曲的index(当前播放歌曲为playlist[index])
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state
