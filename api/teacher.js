import request from '@/utils/request'
export default {
  //分页讲师查询
  getTeacherFrontList(page,limit){
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'post',
    })
  },
  //根据讲师等级查询讲师
  getTeacherListByLevel(page,limit,level){
    return request({
      url: `/eduservice/teacherfront/getTeacherListByLevel/${page}/${limit}`,
      method: 'post',
      data: level
    })
  },
  //查询讲师详情
  getTeacherInfo(teacherId){
    return request({
      url: `/eduservice/teacherfront/getTeacherFrontInfo/${teacherId}`,
      method: 'get'
    })
  }

}
