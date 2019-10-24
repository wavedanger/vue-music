import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'
export function getRecommend() {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function getDiscList() {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    paltform: 'yqq.json',
    hostUin: 0,
    sin: 0,
    ein: 19,
    sortid: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  // return jsonp(url, data, options)
  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data) // es6新语法，返回一个以给定值解析后的Promise对象
    })
}
export function getSongList(disstid) {
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParams, {
    disstid, // 关键数据
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381,
    _: +new Date()
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}
