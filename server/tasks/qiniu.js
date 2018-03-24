const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const mac = new qiniu.auth.digest.Mac(config.AK, config.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, config.bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({key})
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  let movies = [{ video: 'http://vt1.doubanio.com/201803241711/e88031c15999d0b222f836f7474448f4/view/movie/M/301050466.mp4', doubanId: '4920528', cover: 'https://img3.doubanio.com/img/trailer/medium/1355408951.jpg?', poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1062824805.jpg' }];
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传 video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传 cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
        console.log('开始传 poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }
        console.log(movie)
        const a = { video: 'http://vt1.doubanio.com/201803241711/e88031c15999d0b222f836f7474448f4/view/movie/M/301050466.mp4', doubanId: '4920528', cover: 'https://img3.doubanio.com/img/trailer/medium/1355408951.jpg?', poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p1062824805.jpg', 
        videoKey: 'r9P~SsISr35oB9h6I_o~T.png', coverKey: '0MkY9EwNDqMv90eCfzsCg.png', posterKey: 'JdinRMs4CE67IWxq3izlZ.png' };
      } catch (error) {
        console.log(error)
      }
    }
  })
})()
