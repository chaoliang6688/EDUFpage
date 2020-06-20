import request from '@/utils/request'
export default {
  //查询热门课程和名师
  getCourseEighth(){
    return request({
      url: `/eduservice/indexfront/courseEighth`,
      method: 'get'
    })
  },
  getTeacherForth(){
    return request({
      url: `/eduservice/indexfront/teacherForth`,
      method: 'get'
    })
  }
}
