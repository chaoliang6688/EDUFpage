import request from '@/utils/request'
export default {
  //播放器
  getPlayAuth(vid){
    return request({
      url: `/eduvod/video/getPlayAuth/${vid}`,
      method: 'get',
    })
  }
}
