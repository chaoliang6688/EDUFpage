<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
        </section>
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize16">讲师等级:</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <el-button title="全部" @click="getTeacherList">全部</el-button>
                </li>
                <li>
                  <el-button title="首席讲师" @click="getTeacherList(level = 2)">首席讲师</el-button>
                </li>
                <li class="current">
                  <el-button title="高级讲师" @click="getTeacherList(level = 1)">高级讲师</el-button>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="data.total > 0">
            <ul class="of">
              <li v-for="teacher in data.items" v-bind:key="teacher.teacherId">
                <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                        <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                            <img :src="teacher.avatar" :alt="teacher.name" width="142" height="142">
                        </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                        <a :href="'/teacher/'+teacher.id" :title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                        <span class="fsize14 c-999" >{{teacher.career}}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                        <p class="c-999 f-fA">{{teacher.intro}}</p>
                    </div>
                </section>
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
                  @click.prevent="gotoPage(1)" href="#" title="首页">首页</a>
                <a :class="{undisable: !data.hasPrevious}"
                  @click.prevent="gotoPage(data.current-1)" href="#" title="前一页">&lt;</a>
                <a v-for="page in data.pages" v-bind:key="page"
                  :class="{current: data.current == page, undisable: data.current == page}"
                  @click.prevent="gotoPage(page)" href="#" :title="'第'+page+'页'">{{page}}</a>
                <a :class="{undisable: !data.hasNext}"
                  @click.prevent="gotoPage(data.current+1)" href="#" title="后一页">&gt;</a>
                <a :class="{undisable: !data.hasNext}"
                  @click.prevent="gotoPage(data.pages)" href="#" title="末页">末页</a>
                <div class="clear"></div>
            </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from "@/api/teacher"
export default {
  data() {
    return {
      level: '',
      page: 1,
      limit: 8,
      data: {},
    }
  },
  created() {
    this.getTeacherList();
  },
  //异步调用，进入页面后再发起请求，且只请求一次
  //params:   相当于this.$route.params
  /*asyncData({ params, error }) {
    return teacher.getTeacherFrontList(1, 8).then(response => {
      return {
        //赋值
        data: response.data.data,
      }
    });
  },*/
  methods: {
    //查询全部的讲师分页
    getTeacherList(){
      teacherApi.getTeacherListByLevel(this.page,this.limit,this.level).then(response => {
        this.data = response.data.data.map;
        this.level = '';
      })
    },
    //根据条件显示信息
    /*showTeacherByLevel(){
      teacherApi.getTeacherListByLevel(1,8,1).then(response => {

        this.data = response.data.data.map

      })
    },*/
    //参数就是页码数
    gotoPage(page){
        teacherApi.getTeacherListByLevel(page, this.limit,this.level).then(response => {
          this.data = response.data.data.map
      })
      /*teacherApi.getTeacherFrontList(page,8).then(response => {
        this.teacherListInfo = response.data.data.map
      })*/
    }
  }
};
</script>
