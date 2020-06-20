import request from '@/utils/request'
export default {
  //多条件查询
  getCourseFrontList(page,limit,courseFrontVo){
    return request({
      url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: courseFrontVo
    })
  },
  //查询所有分类
  getAllSubject(){
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get',
    })
  },
  //课程详情
  getCourseInfo(courseId){
    return request({
      url: `/eduservice/coursefront/getFrontCourseInfo/${courseId}`,
      method: 'get',
    })
  }
}
