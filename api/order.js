import request from '@/utils/request'
export default {
  //生成订单
  createOrder(courseId){
    return request({
      url: `/eduorder/order/createOrder/${courseId}`,
      method: 'post',
    })
  },
  //查询订单
  getOrderInfo(orderId){
    return request({
      url: `/eduorder/order/getOrderInfo/${orderId}`,
      method: 'get',
    })
  },
  //生成二维码
  createNative(orderNo){
     return request({
       url: `/eduorder/paylog/createNative/${orderNo}`,
       method: 'get'
     })
  },
  //查看订单状态
  queryOrderStatus(orderNo){
    return request({
      url: `/eduorder/paylog/queryOrderStatus/${orderNo}`,
      method: 'get'
    })
  }
}
