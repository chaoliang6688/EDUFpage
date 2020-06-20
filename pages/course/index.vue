<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="getAllCourse">全部</a>
                </li>
                <li v-for="(item,index) in subjectOneList" :key="index" :class="{active:oneIndex==index}">
                  <a :title="item.title" href="#" @click="searchOne(item.id, index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(item,index) in subjectTwoList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="item.title" href="#" @click="searchTwo(item.id,index)">{{item.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort != ''}">
                <a title="关注度" href="javascript:void(0);" @click="searchBuyCount()">关注度
                  <span :class="{hide:buyCountSort == ''}">↓</span>
                </a>
              </li>
              <li :class="{'current bg-orange':gmtCreateSort != ''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                  <span :class="{hide:gmtCreateSort == ''}">↓</span>
                </a>

              </li>
              <li :class="{'current bg-orange':priceSort != ''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                  <span :class="{hide:priceSort == ''}">↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
              <em class="icon30 no-data-ico">&nbsp;</em>
              <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="data.total > 0">
              <ul class="of" id="bna">
                  <li  v-for="item in data.items" v-bind:key="item.id">
                      <div class="cc-l-wrap">
                          <section class="course-img">
                              <img :src="item.cover" class="img-responsive" alt>
                              <div class="cc-mask">
                                  <a :href="'/course/'+item.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                              </div>
                          </section>
                          <h3 class="hLh30 txtOf mt10">
                              <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{item.title}}</a>
                          </h3>
                          <section class="mt10 hLh20 of">
                              <span class="fr jgTag bg-green" v-if="Number(item.price) === 0">
                                  <i class="c-fff fsize12 f-fA" >免费</i>
                              </span>
                              <span class="fl jgAttr c-ccc f-fA">
                                  <i class="c-999 f-fA">{{item.viewCount}}人学习</i>
                                  |
                                  <i class="c-999 f-fA">9993评论</i>
                              </span>
                          </section>
                      </div>
                  </li>
              </ul>
              <div class="clear"></div>
          </article>
      </div>
        <!-- 公共分页 开始 -->
        <div>
            <div class="paging">
                <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                <a :class="{undisable: !data.hasPrevious}"
                  @click.prevent="gotoPage(1)" href="#" title="首页">首</a>
                <a :class="{undisable: !data.hasPrevious}"
                  @click.prevent="gotoPage(data.current-1)" href="#" title="前一页">&lt;</a>
                <a v-for="page in data.pages" v-bind:key="page"
                  :class="{current: data.current == page, undisable: data.current == page}"
                  @click.prevent="gotoPage(page)" href="#" :title="'第'+page+'页'">{{page}}</a>
                <a :class="{undisable: !data.hasNext}"
                  @click.prevent="gotoPage(data.current+1)" href="#" title="后一页">&gt;</a>
                <a :class="{undisable: !data.hasNext}"
                  @click.prevent="gotoPage(data.pages)" href="#" title="末页">末</a>
                <div class="clear"></div>
            </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import courseApi from "@/api/course"
export default {
  data() {
    return {
      page: 1,
      limit: 8,
      data: {},
      subjectOneList: [],//一级分类
      subjectTwoList: [],//二级分类
      courseFrontVo: {},//查询表单对象
      oneIndex: -1,//做一级分类效果
      twoIndex: -1,//二级分类的效果
      buyCountSort: "",
      gmtCreateSort: "",
      priceSort: ""
    }
  },
  created() {
    //课程第一次调用
    this.initCourseInfo();
    //初始化一级分类
    this.initSubject();
  },
  methods: {

    //查询第一页数据
    initCourseInfo(){
      courseApi.getCourseFrontList(this.page,this.limit,this.courseFrontVo)
        .then(response => {
          this.data = response.data.data.map;
        })
    },
    //查询所有的一级分类(包含二级分类)
    initSubject() {
      courseApi.getAllSubject().then(response => {
        this.subjectOneList = response.data.data.list
      })
    },
    //分页切换的方法
    gotoPage(page){
        courseApi.getCourseFrontList(page, this.limit,this.courseFrontVo).then(response => {
          this.data = response.data.data.map
          console.log(this.data)

          })
    },
    //显示二级分类  点击一级分类，查询对应二级分类
    searchOne(subjectParentId,index){
      //把传递index赋值给oneIndex，样式生效
      this.oneIndex = index;
      //点击一级分类之后，避免不可预期的干扰，将二级分类清空
      this.twoIndex = -1;
      this.subjectTwoList.subjectId = '';
      this.subjectTwoList = [];
      //dugger---切换到下一个一级标题之前，需要清空查询对象数据
      this.courseFrontVo.subjectId = "";
      //点击一级分类进行条件查询，将点击的id赋值给courseFrontVo
      this.courseFrontVo.subjectParentId = subjectParentId;
      this.gotoPage(this.page)
      //点击一级分类id和所有一级分类id进行比较，id相同，从而获取二级分类
      for (let i = 0;i < this.subjectOneList.length; i++){
        //获取每个一级分类
        var oneSubject = this.subjectOneList[i];
        //比较id是否相同
        if (subjectParentId == oneSubject.id){
          this.subjectTwoList = oneSubject.children
        }
      }
    },
    //点击某个二级分类实现查询
    searchTwo(subjectId,index){
      //把index赋值,为了样式生效
      this.twoIndex = index;
      //点击二级级分类进行条件查询，将点击的id赋值给courseFrontVo
      this.courseFrontVo.subjectId = subjectId;
      this.gotoPage(this.page)

    },
    //根据销量排序
    searchBuyCount(){
      //设置对应变量的值，样式生效
      this.buyCountSort = "1";
      //另外两个设置为空
      this.gmtCreateSort = "";
      this.priceSort = "";
      //把赋值到courseFrontVo
      this.courseFrontVo.buyCountSort = this.buyCountSort;
      this.courseFrontVo.gmtCreateSort = this.gmtCreateSort;
      this.courseFrontVo.priceSort = this.priceSort;
      //调用方法查询
      this.gotoPage(this.page);
    },
    //根据发布时间排序
    searchGmtCreate(){
      //设置对应变量的值，样式生效
      this.gmtCreateSort = "1";
      //另外两个设置为空
      this.buyCountSort = "";
      this.priceSort = "";
      //把赋值到courseFrontVo
      this.courseFrontVo.buyCountSort = this.buyCountSort;
      this.courseFrontVo.gmtCreateSort = this.gmtCreateSort;
      this.courseFrontVo.priceSort = this.priceSort;
      //调用方法查询
      this.gotoPage(this.page);
    },
    //根据价格排序
    searchPrice(){
      //设置对应变量的值，样式生效
      this.priceSort = "1";
      //另外两个设置为空
      this.gmtCreateSort = "";
      this.buyCountSort = "";
      //把赋值到courseFrontVo
      this.courseFrontVo.buyCountSort = this.buyCountSort;
      this.courseFrontVo.gmtCreateSort = this.gmtCreateSort;
      this.courseFrontVo.priceSort = this.priceSort;
      //调用方法查询
      this.gotoPage(this.page);
    },
    //点击全部查看全部课程
    getAllCourse(){
      this.courseFrontVo = {}
      this.subjectTwoList = []
      this.gotoPage(this.page)
    }
  }
}
</script>
<style scoped>
  .active {
    background: aqua;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
</style>
