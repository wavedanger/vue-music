var express = require('express')
var config = require('./config/index')
var axios = require('axios')
var port = process.env.PORT || config.build.port

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function(req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios
    .get(url, {
      headers: {
        // 通过node请求QQ接口，发送http请求时，修改referer和host
        referer: 'https://y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query // 把前端传过来的params，全部给QQ的url
    })
    .then(response => {
      // 成功与失败的回调
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/music', function(req, res) {
  // 获取vkey
  var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  axios
    .get(url, {
      headers: {
        // 通过node请求QQ接口，发送http请求时，修改referer和host
        referer: 'https://y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query // 把前端传过来的params，全部给QQ的url
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

apiRoutes.get('/songkey', function(req, res) {
  // 这里的路径是给前端发送请求的url
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  // axios发送get请求，可以自己配置config
  axios
    .get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'u.y.qq.com'
      },
      //  params是即将与请求一起发送的url参数，无格式对象/URLSearchParams对象
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/lyric', function(req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios
    .get(url, {
      headers: {
        // 通过node请求QQ接口，发送http请求时，修改referer和host
        referer: 'https://y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query // 把前端传过来的params，全部给QQ的url
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/getSongList', function(req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})
apiRoutes.get('/getSearch', function(req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
