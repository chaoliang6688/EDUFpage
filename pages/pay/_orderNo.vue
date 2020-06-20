<template>
  <div class="cart py-container">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款！订单号：{{order.out_trade_no}}</span>
        </h4>
        <span class="fr">
          <em class="sui-lead">应付金额：</em>
          <em class="orange money">￥{{order.total_fee}}</em>
        </span>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl weixin">微信支付</div>
        <div class="fl sao">
          <p class="red">请使用微信扫一扫</p>
          <div class="fl code">
            <qriously :value="order.code_url" :size="338"/>
            <div class="saosao">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import orderApi from '@/api/orders'
    export default {
        asyncData({params,error}){
          return orderApi.createNative(params.orderNo).then(response => {
            return{
              order: response.data.data.map
            }
          })
        },
      data(){
          return{
            timer: ''
          }
      },
      //每隔5秒去查询一次订单状态
      mounted() {//页面渲染之后执行
        this.timer = this.setInterval(() => {
          this.queryOrderStatus(this.order.out_trade_no)
        },5000)
      },
      methods: {
          queryOrderStatus(orderNo){
            orderApi.queryOrderStatus(orderNo).then(response => {
              if (response.data.map.success){
                //支付成功清除定时器
                clearInterval(this.timer)
                //提示信息
                this.$message({
                  type: 'success',
                  message: '支付成功'
                })
                //跳转回详情页面
                this.$router.push({path: '/course/'+this.order.course_id})
              }
            })
          }
      }
    }
</script>

<style scoped>

</style>
