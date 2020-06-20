import request from '@/utils/request'
export default {
  //根据手机号码发送短信
  getMobile(phone){
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get',
    })
  },
  //注册信息的提交
  submitRegisterInfo(registerVo){
    return request({
      url: `/educenter/member/register`,
      method: 'post',
      data: registerVo
    })
  }
}
